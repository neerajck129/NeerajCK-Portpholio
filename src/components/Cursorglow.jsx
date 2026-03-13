// import React, { useEffect, useRef } from "react";

// const CursorGlow = () => {
//   const glow = useRef(null);

//   useEffect(() => {
//     const moveGlow = (e) => {
//       glow.current.style.left = e.clientX + "px";
//       glow.current.style.top = e.clientY + "px";
//     };

//     window.addEventListener("mousemove", moveGlow);

//     return () => {
//       window.removeEventListener("mousemove", moveGlow);
//     };
//   }, []);

//   return (
//     <div
//       ref={glow}
//       className="pointer-events-none fixed w-24 h-24 bg-cyan-400 opacity-50 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2"
//     ></div>
//   );
// };

// export default CursorGlow;

import React, { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glow = useRef(null);

  useEffect(() => {
    const moveGlow = (e) => {
      glow.current.style.left = e.clientX + "px";
      glow.current.style.top = e.clientY + "px";
    };

    const checkTarget = (e) => {
      const isDisabled = e.target.closest(".glow-disabled");
      glow.current.style.opacity = isDisabled ? "0" : "0.5";
    };

    window.addEventListener("mousemove", moveGlow);
    window.addEventListener("mousemove", checkTarget);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
      window.removeEventListener("mousemove", checkTarget);
    };
  }, []);

  return (
    <div
      ref={glow}
      style={{ transition: "opacity 0.15s ease" }}
      className="pointer-events-none z-[9999] fixed w-24 h-24 bg-cyan-400 opacity-50 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2"
    />
  );
};

export default CursorGlow;