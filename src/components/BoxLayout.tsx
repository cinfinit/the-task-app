import React, { ReactNode } from "react";
import Header from "~/components/Header";


interface BoxLayoutProps {
  children: ReactNode;
}

const BoxLayout: React.FC<BoxLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-3 flex items-center justify-center">
        <div className="w-[500px] rounded-xl border border-gray-300 bg-white p-12  shadow-lg">
          {children}
        </div>
      </div>
    </>
  );
};

export default BoxLayout;
