import React from "react";
import Image from "next/image";
import clock from "./images/clock.svg";
import date from "./images/date.svg";
import location from "./images/location.svg";

function Intro() {
  return (
    <>
      <section className="py-10 bg-stone-100 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-20 items-center max-w-6xl mx-auto">
          <div className="text-left px-8 py-6 md:mr-6 bg-gray-200 relative h-64 rounded-lg">
            <h3 className="text-4xl sm:leading-snug tracking-tight font-bold text-black">
              Mafia Game Night
            </h3>
            <p className="text-stone-800 text-sm font-medium mb-3">
              We get it, youre all cooped up at home but dont let the
              coronavirus stop you from having some fun! Grab a cocktail or your
              favorite snacks because we are bringing a party directly to your
              home!
            </p>
            <div className="flex align-middle gap-x-2 mb-1">
              <Image width="20" height="20" src={date} alt="date" />
              <h4>Saturday, 15 January 2022</h4>
            </div>
            <div className="flex align-middle gap-x-2 mb-1">
              <Image width="20" height="20" src={clock} alt="clock" />
              <h4>9:30 am to 2:30 pm AEDT </h4>
            </div>
            <div className="flex align-middle gap-x-2 mb-1">
              <Image width="20" height="20" src={location} alt="location" />
              <h4>1275 Bloomfield Avenue, Fairfield, NJ</h4>
            </div>
          </div>
          <div>
            <div className="bg-gray-400 transform -translate-x-10 relative h-64"></div>
            <div className="transform md:rounded-md  bg-white rotate-3 scale-110 translate-x-10 md:shadow-2xl -ml-4 -mt-44 p-12  space-y-2">
              <div className="px-4 sm:px-0  max-w-5xl mx-auto">
                <Image
                  width="480"
                  height="270"
                  src="https://media.giphy.com/media/KzDqC8LvVC4lshCcGK/giphy.gif"
                  alt="party2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Intro;
