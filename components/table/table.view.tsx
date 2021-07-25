import React, { FunctionComponent } from "react";

import { useData } from "../../contexts/table.data.context";
import SmartTable from "./smart-table";
import { DataProvider } from "../../contexts/table.data.context";

const PartialTableView: FunctionComponent = () => {
  const { rows = [], headers = [], loading } = useData();
  return (
    <>
      {!loading && <SmartTable rows={rows} headerCells={headers} />}
      {loading && <span>loading...</span>}
    </>
  );
};
interface TableViewProps {
  api: any;
}

export const TableView: FunctionComponent<TableViewProps> = ({ api }) => {
  return (
    <DataProvider api={api}>
      <PartialTableView />
    </DataProvider>
  );
};
