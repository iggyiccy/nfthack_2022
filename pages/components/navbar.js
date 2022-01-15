import React from "react";

function Navbar() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button className="flex items-center h-10 px-2 py-2 -mb-px text-center text-indigo-600 bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1 dark:border-indigo-400 dark:text-indigo-300 whitespace-nowrap focus:outline-none">
            <span className="mx-1 text-sm sm:text-base"> About </span>
          </button>

          <button className="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            <span className="mx-1 text-sm sm:text-base"> Members </span>
          </button>

          <button className="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            <span className="mx-1 text-sm sm:text-base"> Photos </span>
          </button>
          <button className="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            <span className="mx-1 text-sm sm:text-base"> Discussions </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
