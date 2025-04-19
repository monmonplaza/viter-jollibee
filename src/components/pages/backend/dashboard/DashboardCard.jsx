import React from "react";
import { menus } from "../menu-data";
import useQueryData from "@/components/custom-hook/useQueryData";
import { ver } from "@/components/helpers/functions-general";

const DashboardCard = ({ title = "", filterby = "" }) => {
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

  const getCardDetails = result?.data.filter(
    (item) => item.category_title === filterby
  );

  const getActiveMenu = result?.data.filter(
    (item) => item.food_is_active === 1 && item.category_title === filterby
  );
  const getInActiveMenu = result?.data.filter(
    (item) => item.food_is_active === 0 && item.category_title === filterby
  );

  return (
    <>
      <div className="card bg-secondary p-4 rounded-md border border-line">
        <small>{title}</small>
        <h2 className="text-4xl mt-1 mb-2">
          {!isLoading && getCardDetails.length}
        </h2>
        <ul className="flex gap-5 items-center">
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success block"></span>
            {!isLoading && getActiveMenu.length} active
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-gray-300 block"></span>
            {!isLoading && getInActiveMenu.length} inactive
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardCard;
