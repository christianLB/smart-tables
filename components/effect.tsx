import gsap from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

export const Effect = ({ children }) => {
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

    const enter = gsap.fromTo(
      outRef.current,
      {
        x: "-=110px",
        opacity: 0,
      },
      {
        duration: 0.5,
        ease: "linear",
        x: "center",
        position: "absolute",
        opacity: 1,
      }
    );
    const leave = gsap
      .fromTo(
        out2Ref.current,
        {
          x: "center",
          ease: "linear",
        },
        {
          duration: 0.5,
          x: "+=130px",
        }
      )
      .restart();
    return () => {
      //tl.kill();
    };
  }, [children.props]);

  return (
    <>
      {out}
      {out2}
    </>
  );
};
