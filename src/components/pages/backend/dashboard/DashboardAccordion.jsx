import React from "react";
import { menus } from "../menu-data";
import { ChevronDown, Dot } from "lucide-react";
import useQueryData from "@/components/custom-hook/useQueryData";
import { ver } from "@/components/helpers/functions-general";

const DashboardAccordion = ({ title = "", filterby = "" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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

  const handleToggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="accordion mb-2">
      <div
        className="accordion-header p-2 flex justify-between bg-secondary rounded-t-md cursor-pointer"
        onClick={handleToggleOpen}
      >
        <h6 className="mb-0 ">{title}</h6>
        <ChevronDown
          className={`transition-all ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className={`accordion-body  border border-line rounded-b-md border-t-0 overflow-hidden h-full transition-all ${
          isOpen ? "max-h-[600px]" : "max-h-[0px]"
        }`}
      >
        <ul className="space-y-3 py-4 px-2">
          {!isLoading &&
            getCardDetails.map((item, key) => (
              <li className="flex items-center" key={key}>
                <Dot
                  size={30}
                  className={` ${
                    item.food_is_active ? "text-success" : "text-gray"
                  }`}
                />
                {item.food_title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardAccordion;
