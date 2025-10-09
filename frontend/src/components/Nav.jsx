import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[20px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && (
        <div className="w-[90%] h-[50px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[90px] left-[5%]">
          <div className="flex items-center gap-[10px] w-[30%] overflow-hiddenpx-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot className="text-[#ff4d2d]" size={25} />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="flex items-center gap-[10px] w-[80%]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food"
              className="text-gray-700 px-[10px] outline-0 w-full"
            />
          </div>
        </div>
      )}


      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">FOOD DELIVERY</h1>

      <div className="md:w-[60%] lg:w-[40%] h-[50px] bg-white shadow-xl rounded-lg items-center gap-[20px] md:flex hidden">
        <div className="flex items-center gap-[10px] w-[30%] overflow-hiddenpx-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot className="text-[#ff4d2d]" size={25} />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
        </div>
        <div className="flex items-center gap-[10px] w-[80%]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food"
            className="text-gray-700 px-[10px] outline-0 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showSearch ? <MdOutlineCancel size={25} className="text-[#ff4d2d] md:hidden" onClick={() => setShowSearch(false)}/> : <IoIosSearch size={25} className="text-[#ff4d2d] md:hidden" onClick={() => setShowSearch(true)}/>}
        
        <div className="relative cursor-pointer">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            5
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadowl-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName.slice(0, 1).toUpperCase()}
        </div>

        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">
              {userData?.fullName}
            </div>
            <div className="text-[#ff4d2d] font-semibold md:hidden cursor-pointer">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
