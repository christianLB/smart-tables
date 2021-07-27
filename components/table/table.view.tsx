import React, { FunctionComponent } from "react";

import { useData } from "../../contexts/table.data.context";
import SmartTable from "./smart-table";
import { DataProvider } from "../../contexts/table.data.context";
import { Effect } from "../effect";

const PartialTableView: FunctionComponent = () => {
  const { rows = [], headers = [], loading } = useData();
  return (
    <>
      {!loading && <SmartTable rows={rows} headerCells={headers} />}
      <Effect>
        <>{loading && <span>loading...</span>}</>
      </Effect>
    </>
  );
};
interface TableViewProps {
  api: any;
  params: any;
}

export const TableView: FunctionComponent<TableViewProps> = ({
  api,
  params,
}) => {
  return (
    <DataProvider api={api} params={params}>
      <PartialTableView />
    </DataProvider>
  );
};
