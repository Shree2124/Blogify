import React from "react";

function Logo({ width }) {
  return (
    <div className="font-bold font-mono flex justify-center flex-col items-center text-xs">
      <img src="./blog.svg" style={{width: width}} />
      <p className="tracking-[0.5rem] pt-2">Blogify</p>
    </div>
  );
}

export default Logo;
