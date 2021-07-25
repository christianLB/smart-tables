/* 
The purpose of this file is to create a Provider/Wrapper component for the views that
consume data from an api and needs to be up to date with changes in calendar or other events in the app.
Internally, it creates a React Context that passes down all necessary data to the wrapped PartialView, through
the wrapper Provider.
It uses effects to refetch data when a change in calendar or any observed values are changed.
The intention is to abstract api interaction from partial views, which should only deal with UI logic 
allowing for more control on api access by centralizing it with a global scope.
*/
import React, { useState, useEffect, useContext } from "react";
import { RouterProps } from "../types/router.type";
import { useCalendar } from "../contexts/calendar.context";
import { PrizmDataModelType } from "../types/prizm_data_model.type";

const PartialViewContext = React.createContext(null);
//types and interfaces
interface DealershipSelectionProps {
  // TODO: this should be grabbed from context by header component.
  base: string;
  showAll: boolean;
}

interface PartialViewProviderProps extends RouterProps {
  apiMethod: any;
  extraParams?: any;
  observedValues?: any[];
  children?: JSX.Element;
}

export const usePartial = () => useContext(PartialViewContext);

export function PartialViewProvider({
  apiMethod,
  extraParams = {},
  children,
  observedValues = [],
  match,
}: PartialViewProviderProps) {
  //state
  // pulling dealer from mainStore - Legacy code reference
  const mainStoreDealer = window.mainStore.dealers.get(match.params.dealerId);

  const [data, setData] = useState<PrizmDataModelType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    appliedCurrentRange,
    appliedCompareRange,
    isComparing,
  } = useCalendar();

  //Handlers
  const fetchData = async () => {
    let params = {
      dealerId: match.params.dealerId,
      startDate: appliedCurrentRange.range.start.format("YYYYMMDD"),
      endDate: appliedCurrentRange.range.end.format("YYYYMMDD"),
      compareStartDate: appliedCompareRange.range.start.format("YYYYMMDD"),
      compareEndDate: appliedCompareRange.range.end.format("YYYYMMDD"),
    };

    if (!window.mainStore.currentUser.featureFlags.CalendarV2)
      //remove after calendar v2
      params = {
        ...params,
        startDate: window.calendarStore.last.start.format("YYYYMMDD"),
        endDate: window.calendarStore.last.end.format("YYYYMMDD"),
        compareStartDate: window.calendarStore.first.start.format("YYYYMMDD"),
        compareEndDate: window.calendarStore.first.end.format("YYYYMMDD"),
      };

    setIsLoading(true);
    try {
      setData(await apiMethod(...Object.values({ ...params, ...extraParams })));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  //effect for firing calendar V1. Should be removed when full migration to calendar v2 is complete
  useEffect(() => {
    fetchData();
    window.addEventListener("calendarTenure", async () => await fetchData());
    return () =>
      window.removeEventListener(
        "calendarTenure",
        async () => await fetchData()
      );
  }, [match.params.dealerId, appliedCurrentRange, ...observedValues]);

  return (
    <PartialViewContext.Provider
      value={{
        data: data,
        isLoading: isLoading,
        mainStoreDealer,
        isComparing,
        startDate: appliedCurrentRange.range.start.format("YYYYMMDD"), //we also pass them formatted for convenience.
        endDate: appliedCurrentRange.range.end.format("YYYYMMDD"),
        compareStart: appliedCompareRange.range.start.format("YYYYMMDD"),
        compareEnd: appliedCompareRange.range.end.format("YYYYMMDD"),
      }}
    >
      {children}
    </PartialViewContext.Provider>
  );
}
//All our stateless views (children here) wrapped inside this component will have access to the above values
//And will be able to observe changes on them as they do for any other outsider prop.
