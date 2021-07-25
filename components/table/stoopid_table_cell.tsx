import React, { FunctionComponent } from "react";
import { Breakpoints, TableCellData } from "../../models/types/table.type";

type StoopidTableCellProps = {
  cell: TableCellData;

  //optional
  className?: string;
  currentBreakpoint?: Breakpoints;
  text?: string;
  component?: JSX.Element;
  customClassName?: string;
  onClick?: () => void;
};

// const cellShouldBeHidden = (cell:stoopidTableCell, currentBreakpoint:string) => {
//     if (cell.responsive && cell.responsive.breakpoints) {
//         const { breakpoints, headerName } = cell.responsive;
//         if (breakpoints.split(',').includes(currentBreakpoint)) {
//             return true;
//         }
//     }
//     return false;
// }

const StoopidTableCell: FunctionComponent<StoopidTableCellProps> = ({
  cell,
  className = "",
  customClassName = "",
  currentBreakpoint,
  onClick,
}: StoopidTableCellProps) => (
  //!cellShouldBeHidden(currentBreakpoint) &&
  
  <div
    className={[customClassName || "st-cell", className || null].filter(b => b !== null).join(' ')}
    onClick={onClick}
  >
    {cell.component}
  </div>
);

export default StoopidTableCell;
