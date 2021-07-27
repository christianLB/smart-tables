import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { Effect } from "../effect";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const TableCell = ({ value, type, headerName }) => {
  const span = useRef(null);

  type = !type ? "value" : type; //default cell type

  // useLayoutEffect(() => {
  //   span.current.innerHTML = "";
  //   if (typeof value === "number") {
  //     gsap.to(span.current, {
  //       textContent: value,
  //       duration: 1,
  //       ease: "linear",
  //       snap: { textContent: 1 },
  //       onUpdate: function() {
  //         span.current.innerHTML = numberWithCommas(
  //           parseFloat(span.current.innerHTML)
  //         );
  //       },
  //     });
  //   }
  //   return () => {};
  // }, []);

  return (
    <>
      <span ref={span} className={"value"}>
        {/* {typeof value === "string" && value} */}
        {value}
      </span>
      <span ref={span} className={"value"}>
        {typeof value === "object" && "---"}
      </span>
    </>
  );
};
