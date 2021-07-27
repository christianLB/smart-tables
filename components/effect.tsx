import gsap from "gsap";
import React, { Fragment, useLayoutEffect, useRef } from "react";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Effect = ({ children }) => {
  const childrenRef = useRef([]);

  useLayoutEffect(() => {
    const items = childrenRef.current.map(element => element);
    const tl = gsap.from(items, {
      x: "-=800%",
      duration: 1,
      ease: "expo",
    });
    return () => {
      //tl.kill();
    };
  }, [children]);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          ref: ref => (childrenRef.current[index] = ref),
        })
      )}
    </>
  );
};
