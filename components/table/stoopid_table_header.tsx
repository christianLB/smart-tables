import React, { Fragment, FunctionComponent } from "react";
import { TableCellData } from "../../models/types/table.type";
//import { BreakpointsType, useBreakpointList } from "../../../_V2/contexts/breakpoints_list.context"
import StoopidCell from "./stoopid_table_cell";

type StoopidTableHeaderRowProps = {
  cells: TableCellData[];
  //optional
  className?: string;
  allowExpand?: boolean;
  displayNameCell: boolean;
  responsiveCellsIndexes?: TableCellData[];
  allowSelectAllRows?: boolean;
  allSelected?: boolean;
  busy?: boolean;

  onSelectAll?: (state: boolean) => void;
};

const handleSortChange = (cell: TableCellData) => {
  cell.onClick ? cell.onClick() : null;
};

const StoopidTableHeaderRow: FunctionComponent<StoopidTableHeaderRowProps> = ({
  cells = [],
  className = "",
  allowExpand,
  displayNameCell = false,
  responsiveCellsIndexes = [],
  allowSelectAllRows = false,
  allSelected,
  busy = false,
  onSelectAll,
}: StoopidTableHeaderRowProps) => {
  //const { currentBreakpoint } = useBreakpointList() || '';
  const currentBreakpoint = null;

  const nameCell = displayNameCell ? [{ text: "Name", className: "name" }] : [];
  cells = [...nameCell, ...cells];

  const responsiveCells: JSX.Element[] = [];
  const hiddenCells: JSX.Element[] = [];

  const selectRowCell = (
    <StoopidCell
      cell={{
        // component: <PrizmInput
        //   id={'select-all-rows'}
        //   type={'checkbox'}
        //   labelText={''}
        //   name={''}
        //   onChange={() => {}}
        //   standAlone
        //   value={allSelected}
        // />
        component: <input type={"checkbox"} />,
      }}
      onClick={() => !busy && onSelectAll(!allSelected)}
      className={"xsmall justify-content-center align-items-center"}
    />
  );

  [...cells].map((cell, i) => {
    const HeaderCell = (
      <StoopidCell
        cell={cell}
        customClassName={`st-cell ${cell.className || ""}`}
        key={`cell${i}`}
        onClick={() => {
          !busy && handleSortChange(cell);
        }}
      />
    );

    //responsive.
    const responsiveCellIndex = responsiveCellsIndexes[i];
    if (responsiveCellIndex) {
      if (responsiveCellIndex.breakpoints?.includes(currentBreakpoint)) {
        hiddenCells.push(HeaderCell);
        return;
      }
      responsiveCells.push(HeaderCell);
      return;
    }
    responsiveCells.push(HeaderCell);
  });

  return (
    <Fragment>
      <div
        className={["st-header", className || null, (busy && "busy") || null]
          .filter(b => b !== null)
          .join(" ")}
      >
        {hiddenCells.length > 0 && (
          <StoopidCell cell={{ text: "" }} customClassName={"expansion-cell"} />
        )}
        {allowSelectAllRows && selectRowCell}
        {responsiveCells}
      </div>
    </Fragment>
  );
};

export default StoopidTableHeaderRow;
