import React from "react";

export const TableCell = ({ value, type, headerName }) => {
  type = !type ? "value" : type; //default cell type
  //console.log({currentValue, compareValue, format, decimalPlaces, invertDelta, type, headerName})
  return (
    <>
      {type == "empty" && <></>}
      {type == "text" && <>{typeof value === "string" && value}</>}
      {type == "value" && <>{typeof value === "string" && value}</>}
    </>
  );
};
