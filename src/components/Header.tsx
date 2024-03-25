
import React from "react";

const Header = () => {
  return (
    <div className=" py-2 text-black">
      <div className="flex px-4">
      
        <div className="text-black-50 ml-auto flex items-center space-x-4 text-xs">
          {/* Help */}
          <button className="hover:text-gray-300">Help</button>
          {/* Orders & Returns */}
          <button className="hover:text-gray-300">Orders & Returns</button>
          {/* User */}
          <button className="hover:text-gray-300">Hi, User</button>
        </div>
      </div>
      <div className="mt-4 flex justify-between px-4">
        <div>
          <span className="text-3xl font-bold ">ECOMMERCE</span>
        </div>
        <div className="flex items-center space-x-4 font-bold">
          <span>Categories</span>
          <span>Sales</span>
          <span>Clearance</span>
          <span>New Stock</span>
          <span>Trending</span>
        </div>
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
            className=" ml-11 mr-3 h-6 w-6 fill-current"
          >
            <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
          </svg>

          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>


        </div>
      </div>
      <div className="mt-2 bg-gray-100 p-2 px-4">
        <div className="text-center text-sm">
          <span>&lt; &emsp;Get 10% off on business sign up &emsp; &gt; </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
