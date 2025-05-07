import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";


// import SidebarSubMenu from "SidebarSubMenu";
const SidebarContent = () => {
  const { mode } = useContext(WindmillContext);


  const handleLogOut = () => {
    Cookies.remove("adminInfo");
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className=" text-gray-900 dark:text-gray-200" href="/dashboard">
        {mode === "dark" ? (
       <></>
        ) : (
          <></>
        )}
      </a>
      <ul className="mt-8">
        
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button onClick={handleLogOut} size="large" className="w-full">
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{"LogOut"}</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
