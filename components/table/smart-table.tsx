// This is component requires an array of rows, being rows an array of objects of type StoopidTableCell,
// StoopidTableCell: {
//   text: 'if only text will populate the cell, this is the attribute to set it',
//   component: Jsx component to be rendered as children of the cell (if text is set, both will display)
// }

// Header cells are fed separately, being an array of the type TableCellData
// TableCellData: {
//   sortable: flag to activate or deactivate sorting functionality for that column.
//   onClick: handler that will be trigger on sorting change.
// }
// allowExpand: flag to activate or deactivate expand functionality for responsive rows.
// paginationParams: When subscribed to a paginationContext, through this prop, updated pagination params will be received.
// onPaginationChange: handler containing API call to update pagination/sorting/filtering (provided, for instance by a pagination context or global state management)

import React, { FunctionComponent } from "react"; // we need this to make JSX compile
import {
  TableRowData,
  TableCellData,
  PaginationParams,
  TableColumnConfig,
  Breakpoints,
  TableHeaderCellData,
} from "../../models/types/table.type";
import { Paginator } from "../paginator";

import StoopidTable from "./stoopid_table";
import { TableCell } from "./table_cell";

interface SmartTableProps {
  allowExpand?: boolean;
  allowRowSelect?: boolean;
  allowRowDelete?: boolean;
  className?: string;
  id?: string;
  rows: TableRowData[];
  headerCells?: TableCellData[];
  paginationParams?: PaginationParams;
  busy?: boolean;
  selectedRows?: {};

  //event handlers
  //onPaginationChange?: PaginationParamsHandler;
  onRowSelect?: (rowEntity: any, rowId: string, selected: boolean) => void;
  onBatchDelete?: () => void;
}

const SmartTable: FunctionComponent<SmartTableProps> = ({
  rows = [],
  headerCells = [],
  className,
  allowExpand = true,
  allowRowSelect = false,
  allowRowDelete = false,
  id = "",
  paginationParams,
  busy = false,
  selectedRows,
  // onPaginationChange,
  onRowSelect,
}: SmartTableProps) => {
  const buildHeaderCells = (headerCells: TableHeaderCellData[]) =>
    [...headerCells].map(cell => {
      const { sortAttribute, sortable } = cell;

      // if (paginationParams) {
      // //Pagination & sorting
      // let { isSortAsc, sortBy } = paginationParams;
      // const isSorting = sortAttribute === sortBy;
      // const sortDirectionArrow = (
      // <i className={`fa fa-caret-${isSortAsc ? "up" : "down"} pl1`}></i>
      // );

      // // if this is the sorting column, append the direction arrow.
      // cell.component = isSorting ? sortDirectionArrow : null;
      // cell.invertRender = true;

      // if (sortable) {
      // cell.onClick = () => {
      // if (isSorting) {
      // isSortAsc = !isSortAsc;
      // }
      // let nextPaginationParams: PaginationParams = paginationParams;
      // nextPaginationParams = {
      // ...nextPaginationParams,
      // sortBy: sortAttribute,
      // isSortAsc: isSortAsc,
      // };

      // onPaginationChange &&
      // !busy &&
      // onPaginationChange(nextPaginationParams);
      // };
      // }
      // }
      return cell;
    });

  if (allowRowDelete) {
    const className = "right xsmall center";
    const trashCanComponent = () => <i className="fa fa-trash"></i>;
    headerCells.push({ text: "", className: className });
    rows.forEach(row => {
      const { deleteHandler = () => {} } = row;
      row.cells.push({
        component: trashCanComponent(),
        onClick: () => deleteHandler(),
        className: className,
      });
    });
  }

  return (
    <>
      <StoopidTable
        id={id}
        rows={rows}
        className={["smarttable", className].join(" ")}
        allowExpand={allowExpand}
        headerCells={buildHeaderCells(headerCells)}
        allowRowSelect={allowRowSelect}
        onRowSelect={onRowSelect}
        selectedRows={selectedRows}
        busy={busy}
      />
      {paginationParams && (
        <Paginator
        //paginationParams={paginationParams}
        // onPaginationChange={onPaginationChange}
        //onPaginationChange={() => {}}
        />
      )}
    </>
  );
};

//Utility functions (additional functionality for building tables)

export const buildTableRow = (
  rowData, //add type to this
  columns: TableColumnConfig[],
  rowKey: string,
  rowClassName: string,
  rowLinkUrl
): TableRowData => {
  rowClassName = !rowLinkUrl ? `${rowClassName} no-link` : rowClassName;
  return {
    rowLinkUrl: rowLinkUrl,
    className: rowClassName,
    cells:
      columns &&
      columns?.map(column => {
        const {
          invertDelta,
          decimalPlaces,
          format,
          type,
          headerName,
          computedValue,
        } = column; //column config
        let value = rowData[column.metric]; //cell content
        //if a function was provided from outside to dinamicaly compute the value of this cell...
        const computed = !!computedValue && column.computedValue(rowKey, value);
        return {
          component: (
            <TableCell value={value} type={type} headerName={headerName} />
          ),
        };
      }),
  };
};

export const buildHeaders = (columns: TableColumnConfig[]) =>
  columns.map(column => ({
    text: column.headerName,
    breakpoints: (column.breakpoints?.split(",") as Breakpoints[]) || null,
  }));

export default SmartTable;
