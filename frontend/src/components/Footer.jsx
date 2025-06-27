import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 bg-blue-600 text-white text-center py-4 shadow-inner">
      <p className="text-sm">© {new Date().getFullYear()} Construction Connect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
