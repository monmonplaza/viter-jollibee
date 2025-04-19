import useQueryData from "@/components/custom-hook/useQueryData";
import { imgPath, ver } from "@/components/helpers/functions-general";
import React from "react";

const MenuTitle = ({ category }) => {
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/food`, // endpoint
    "get", // method
    "food" // key
  );

  const getCurrentCategory = () => {
    if (result?.data.length > 0) {
      return result?.data.filter((item) => item.food_category_id === category);
    }
  };

  return (
    <>
      <div className="p-4 bg-myred flex items-center text-white gap-5">
        <h2 className="mb-0">
          {!isLoading && getCurrentCategory()[0]?.category_title}
        </h2>
      </div>
    </>
  );
};

export default MenuTitle;
