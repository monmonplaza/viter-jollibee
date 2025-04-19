import React from "react";

const Pills = ({ isActive }) => {
  return (
    <span
      className={`text-[10px]  px-2 py-0.5 rounded-full w-[50px] border ${
        isActive
          ? "bg-success/30 border-success text-success"
          : "bg-gray-100/30 border-cancel text-gray-200"
      }  text-center bg-opacity-20 `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default Pills;
