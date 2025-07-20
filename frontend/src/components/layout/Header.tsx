import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row justify-between p-4 rounded-lg shadow-xl items-center">
      <Link to="/">
        <img src="assets/hardhat.png" width={60} height={60} />
      </Link>

      <div className="flex flex-row gap-8 mr-10 text-lg">
        <Link to="/clients">Clients</Link>
        <Link to="/estimates">Estimates</Link>
      </div>
    </div>
  );
};

export default Header;
