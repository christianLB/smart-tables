import gsap from "gsap";
import React, {
  FunctionComponent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Redirect } from "react-router-dom";
import { rowId, TableCellData } from "../../models/types/table.type";

//import { useBreakpointList } from '../../contexts/breakpoints_list.context';

import StoopidCell from "./stoopid_table_cell";

type StoopidTableRowProps = {
  rowId?: rowId; //necessary for row selection.
  cells: TableCellData[];
  //optional
  className?: string;
  allowExpand?: boolean;
  allowRowSelect?: boolean;
  currentBreakpoint?: string;
  customClasses?: boolean;
  responsiveCellsIndexes?: TableCellData[];
  rowLinkUrl?: string;
  rowEntity?: any;
  selected?: boolean;
  busy?: boolean;
  onRowClick?: () => void;
  onRowSelect?: (rowEntity: any, rowId: rowId, selected: boolean) => void;
};

const StoopidTableRow: FunctionComponent<StoopidTableRowProps> = ({
  rowId,
  cells = [],
  className = "",
  allowExpand,
  allowRowSelect = false,
  customClasses = false,
  responsiveCellsIndexes,
  rowEntity,
  selected = false,
  rowLinkUrl,
  busy = false,
  onRowSelect,
  onRowClick,
}: StoopidTableRowProps) => {
  const rowElement = useRef(null);
  let [expanded, setExpanded] = useState(false);
  let [redirect, setRedirect] = useState(false);
  // const { currentBreakpoint } = useBreakpointList() || '';
  const currentBreakpoint = "xl";
  const toggleExpanded = () => setExpanded(!expanded);
  // const history = useHistory();
  const rowClickHandler = ({ onClick: cellClickHandler }: TableCellData) => {
    if (cellClickHandler) {
      cellClickHandler();
    } else if (rowLinkUrl) {
      setRedirect(true);
    } else if (onRowClick) {
      onRowClick();
    }
  };

  const handleSelectRow = () => {
    onRowSelect(rowEntity, rowId, !selected);
  };

  const hiddenCells: JSX.Element[] = [];
  const notHiddenCells: JSX.Element[] = [];

  const expansionCell = (
    <StoopidCell
      cell={{
        component: (
          <span
            className={
              expanded ? "fa fa-minus text-blue" : "fa fa-plus text-blue"
            }
          ></span>
        ),
      }}
      onClick={toggleExpanded}
      customClassName={"expansion-cell"}
    />
  );

  const selectRowCell = (
    <StoopidCell
      cell={{
        // component: <PrizmInput
        //   type={'checkbox'}
        //   labelText={''}
        //   name={''}
        //   onChange={() => {}}
        //   standAlone
        //   value={selected}
        // />
        component: <input type="checkbox" />,
      }}
      onClick={() => !busy && handleSelectRow()}
      className={"xsmall justify-content-center align-items-center"}
    />
  );

  [...cells].map((cell, i) => {
    const Cell = (
      <StoopidCell
        cell={cell}
        className={`${className}${cell.className ? ` ${cell.className}` : ""}`}
        key={`cell${i}`}
        onClick={() => !busy && rowClickHandler(cell)}
      />
    );

    const responsiveCellIndex = responsiveCellsIndexes[i];
    if (responsiveCellIndex) {
      if (responsiveCellIndex.breakpoints.includes(currentBreakpoint)) {
        hiddenCells.push(
          <li key={`cell${i}`}>
            <span className={"column-name bold mr1"}>
              {`${responsiveCellIndex.text}:`}
            </span>
            <span>
              <div className={"st-cell responsive-table"}>
                <div className={"data"}>
                  {cell.text} {cell.component}
                </div>
                <div className={"data"}> </div>
                <div className={"data"}> </div>
              </div>
            </span>
          </li>
        );
        return;
      }
      notHiddenCells.push(Cell);
      return;
    }
    notHiddenCells.push(Cell);
  });

  // useLayoutEffect(() => {
  //   const row = rowElement.current;
  //   const items = row.querySelectorAll(".st-cell");

  //   gsap.from(items, {
  //     x: "-=100%",
  //     duration: 0.1,
  //     stagger: {
  //       amount: 0.1,
  //       ease: "expo",
  //     },
  //     scale: 2,
  //     ease: "expo",
  //     opacity: 0,
  //   });
  // }, []);

  return (
    <>
      {redirect && <Redirect to={rowLinkUrl} push />}

      <div
        ref={rowElement}
        className={[
          customClasses || "st-row",
          className || null,
          (busy && "busy") || null,
        ]
          .filter(b => b !== null)
          .join(" ")}
      >
        {allowExpand && hiddenCells.length > 0 && expansionCell}
        {allowRowSelect && selectRowCell}
        {notHiddenCells}
      </div>
      {allowExpand &&
      expanded &&
      hiddenCells.length > 0 && ( //expansion row
          <div className={`st-row expanded`}>
            <ul className={"list"}>{hiddenCells}</ul>
          </div>
        )}
    </>
  );
};

export default StoopidTableRow;
