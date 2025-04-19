import { imgPath } from "@/components/helpers/functions-general";
import { CheckCircle, CircleCheck, Pointer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <main className="w-full h-screen relative bg-red-900">
        <img
          src={`${imgPath}/banner.webp`}
          alt=""
          className="h-full w-full block object-cover opacity-90"
        />

        <div className="absolute w-full bottom-0 left-0">
          <div className="bg-myred text-white text-center p-4">
            <Link
              to="/order"
              className="text-4xl font-bold flex gap-5 justify-center items-center"
            >
              <Pointer size={30} className="rotate-[-30deg]" /> Tap Here to
              Start
            </Link>
          </div>

          <div className="bg-white p-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <CircleCheck size={40} fill="red" stroke="white" />
              <h4 className="mb-0 leading-[1.1]">
                Pay with Cash <br /> or Card
              </h4>
            </div>

            <div className="pl-4 border-l-4 border-myred basis-[300px]">
              <h5 className="text-myred mb-1">For other payments</h5>
              <p className="text-xs text-black opacity-60">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                rerum Quisquam quas pariatur
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Welcome;
