import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Logimax</div>
      <nav>
        <ul className="flex list-none p-0 m-0">
          <li className="mx-2">
            <a href="#home" className="text-white no-underline hover:underline">
              Home
            </a>
          </li>
          <li className="mx-2">
            <a
              href="#about"
              className="text-white no-underline hover:underline"
            >
              About
            </a>
          </li>
          <li className="mx-2">
            <a
              href="#services"
              className="text-white no-underline hover:underline"
            >
              Services
            </a>
          </li>
          <li className="mx-2">
            <a
              href="#contact"
              className="text-white no-underline hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
