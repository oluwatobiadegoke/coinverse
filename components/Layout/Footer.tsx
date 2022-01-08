import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-2 px-2 md:px-4 lg:px-9 flex items-center gap-2 font-lato">
      <p className="mb-0 text-xs mt-1">&copy;copyright 2022</p>
      <div className="flex items-center flex-1 gap-1 font-bold">
        <span className="text-pri-500 text-lg font-shizuru">C</span>
        <span className="mt-1 text-xs font-light">oinverse</span>
      </div>
    </footer>
  );
};

export default Footer;
