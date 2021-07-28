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
  const outRef = useRef(null);
  const out2Ref = useRef(null);

  // const cloneChildren = (children, rref) => {
  //   return (
  //     <>
  //       {React.Children.map(children, (child, index) =>
  //         React.cloneElement(child, {
  //           ref: ref => (rref.current[index] = ref),
  //         })
  //       )}
  //     </>
  //   );
  // };

  const [prevHTML, setPrevHTML] = useState(null);
  const [out, setOut] = useState(null);
  const [out2, setOut2] = useState(null);

  useLayoutEffect(() => {
    setOut(<div ref={outRef}>{children.props.children}</div>);
    setOut2(<div ref={out2Ref}>{prevHTML}</div>);
    setPrevHTML(children.props.children);
    const enter = transitions[onEnter ? onEnter : "fadeIn"](outRef.current);
    const leave = transitions[onLeave ? onLeave : "fadeOut"](out2Ref.current);
    return () => {
      enter.kill();
      leave.kill();
    };
  }, [children.props, onEnter, onLeave]);

  return (
    <>
      {out}
      {out2}
    </>
  );
};
