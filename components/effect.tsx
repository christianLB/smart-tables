import React, { useLayoutEffect, useRef, useState } from "react";
import * as transitions from "../utils/transitions";
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

export const Effect = ({
  children,
  onEnter = "fadeIn",
  onLeave = "fadeOut",
}) => {
  const enteringRef = useRef(null);
  const leavingRef = useRef(null);

  const [prevHTML, setPrevHTML] = useState(null);
  const [entering, setEntering] = useState(null);
  const [leaving, setLeaving] = useState(null);

  useLayoutEffect(() => {
    const enterValue = children.props.children;
    const leaveValue = prevHTML;

    setEntering(<div ref={enteringRef}>{children.props.children}</div>);
    setLeaving(<div ref={leavingRef}>{prevHTML}</div>);
    setPrevHTML(children.props.children);
    // const enter = transitions[onEnter ? onEnter : "fadeIn"](
    //   enteringRef.current
    // );
    // const leave = transitions[onLeave ? onLeave : "fadeOut"](
    //   leavingRef.current
    // );
    const enter = transitions.enter(
      enteringRef.current,
      enterValue,
      leaveValue
    );
    const leave = transitions.leave(leavingRef.current);
    return () => {
      enter && enter.kill();
      leave && leave.kill();
    };
  }, [children.props, onEnter, onLeave]);

  return (
    <>
      {entering}
      {leaving}
    </>
  );
};
