import { imgPath, ver } from "@/components/helpers/functions-general";
import React from "react";
import { menus } from "../backend/menu-data";
import useQueryData from "@/components/custom-hook/useQueryData";
import SpinnerTable from "../backend/partials/spinners/SpinnerTable";
import IconNoData from "../backend/partials/IconNoData";

const MenuList = ({ category, cartData, setCartData, setIsSuccess }) => {
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

  console.log(category);

  // const menuFilter =
  //   result?.data.length !== 0 &&
  //   result?.data.filter((item) => item.food_category_id === category);

  const handleAdd = (item) => {
    const exist = cartData.find((data) => data.food_aid === item.food_aid);
    if (exist !== undefined) {
      setCartData(
        cartData.map((cart) =>
          cart.food_aid === item.food_aid
            ? { ...exist, quantity: exist.quantity + 1 }
            : cart
        )
      );
    } else {
      setCartData([...cartData, { ...item, quantity: 1 }]);
    }
    setIsSuccess(true);
  };

  return (
    <div className="relative">
      {isLoading || (isFetching && <SpinnerTable />)}
      {result?.data.length === 0 ? (
        <IconNoData />
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">
          {result?.data
            .filter((item) => item.food_category_id === category)
            .map((item, key) => (
              <button key={key} onClick={() => handleAdd(item)}>
                <img
                  src={`${imgPath}/${item.food_image}`}
                  alt=""
                  className="w-[80%] mx-auto mb-2"
                />
                <h6 className="font-bold text-sm">{item.food_title}</h6>
                <p className="text-sm"> {item.food_price}</p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
