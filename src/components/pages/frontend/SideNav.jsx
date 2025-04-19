import useQueryData from "@/components/custom-hook/useQueryData";
import { imgPath, ver } from "@/components/helpers/functions-general";
import React from "react";
import SpinnerTable from "../backend/partials/spinners/SpinnerTable";
import IconServerError from "../backend/partials/IconServerError";
import IconNoData from "../backend/partials/IconNoData";

const SideNav = ({ setCategory }) => {
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/category`, // endpoint
    "get", // method
    "category" // key
  );

  const handleGetCategory = (category) => {
    setCategory(category);
  };
  return (
    <>
      <h5 className="mb-0 text-center pt-2 text-sm">Menu</h5>

      <div className="relative">
        {isLoading ? (
          <SpinnerTable />
        ) : error ? (
          <IconServerError />
        ) : result?.data.length === 0 ? (
          <IconNoData />
        ) : (
          <ul className="space-y-10">
            {result?.data.map((item, key) => (
              <li className="mb-3" key={key}>
                <button onClick={() => handleGetCategory(item.category_aid)}>
                  <img src={`${imgPath}/${item.category_thumbnail}`} />
                  <small className="text-xs">{item.category_title}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SideNav;
