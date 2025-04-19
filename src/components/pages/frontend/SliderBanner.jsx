import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imgPath, ver } from "@/components/helpers/functions-general";
import useQueryData from "@/components/custom-hook/useQueryData";
import SpinnerTable from "../backend/partials/spinners/SpinnerTable";
import IconNoData from "../backend/partials/IconNoData";

const SliderBanner = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/advertisement`, // endpoint
    "get", // method
    "advertisement" // key
  );

  return (
    <div>
      {isLoading ? (
        <SpinnerTable />
      ) : result?.data.length === 0 ? (
        <IconNoData />
      ) : (
        <Slider {...settings}>
          {result?.data.map((item, key) => {
            return (
              <img
                src={`${imgPath}/${item.advertisement_image}`}
                alt=""
                className="h-[300px] object-cover w-full"
                key={key}
              />
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default SliderBanner;
