import React, { FunctionComponent } from "react"; // we need this to make JSX compile
import {
  TableHeaderCellData,
  TableRowData,
} from "../../models/types/table.type";
import StoopidTableHeaderRow from "./stoopid_table_header";
import StoopidRow from "./stoopid_table_row";

type StoopidTableProps = {
  id?: string;
  rows: TableRowData[];
  headerCells?: TableHeaderCellData[];
  className?: string;
  allowExpand?: boolean;
  allowRowSelect?: boolean;
  displayNameCell?: boolean;
  busy?: boolean;
  isLoading?: boolean;
  selectedRows?: {};
  onRowSelect?: (rowEntity: any, rowId: string, selected: boolean) => void;
};

const StoopidTable: FunctionComponent<StoopidTableProps> = ({
  id = "",
  rows = [],
  headerCells = [],
  className = "stoopidTable",
  allowExpand = true,
  allowRowSelect = false,
  displayNameCell = false,
  busy = false,
  isLoading = false,
  selectedRows,
  onRowSelect,
}: StoopidTableProps) => {
  const responsiveCellsIndexes: TableHeaderCellData[] = [];

  [...headerCells].map((cell, cellIndex) => {
    if (cell.breakpoints) {
      responsiveCellsIndexes[cellIndex] = cell;
    }
  });

  const allRows = [];

  const handleSelectAll = (state: boolean) => {
    allRows.map(row => {
      row.props.onRowSelect(row.props.rowEntity, row.props.rowId, state);
    });
  };

  const selectedRowsLength = selectedRows
    ? Object.keys(selectedRows).length
    : 0;
  const allSelected = selectedRowsLength === rows.length && rows.length > 0;

  return (
    <div
      id={id}
      className={[className, (busy && "busy") || null]
        .filter(b => b !== null)
        .join(" ")}
    >
      {headerCells && (
        <StoopidTableHeaderRow
          cells={headerCells}
          displayNameCell={displayNameCell}
          responsiveCellsIndexes={responsiveCellsIndexes}
          allowSelectAllRows={allowRowSelect}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          busy={busy}
        />
      )}
      <>
        {rows.map((row, i) => {
          const RowComponent = (
            <StoopidRow
              rowId={row.rowId}
              cells={row.cells}
              className={row.className}
              onRowClick={row.clickHandler}
              rowLinkUrl={row.rowLinkUrl}
              allowExpand={allowExpand}
              allowRowSelect={allowRowSelect}
              onRowSelect={onRowSelect}
              responsiveCellsIndexes={responsiveCellsIndexes}
              rowEntity={row.rowEntity}
              selected={selectedRows && row.rowId && !!selectedRows[row.rowId]}
              key={`row${i}`}
              busy={busy}
            />
          ); //data rows
          allRows.push(RowComponent);
          return RowComponent;
        })}
      </>
      {isLoading && <div className="loadingpane p3">loading...</div>}
      {!rows.length && (
        <div className="st-row flex-center p3">
          <span>No Results Found.</span>
        </div>
      )}
    </div>
  );
};

export default StoopidTable;
