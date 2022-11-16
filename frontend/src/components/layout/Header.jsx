import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../global/Logo";
import SearchBar from "../header/SearchBar";
import PictoBeer from "../header/PictoBeer";
import PictoBeerAnimation from "../header/PictoBeerAnimation";

function Header({ isBurgerMenuOpen, handleDisplayBurger }) {
  // Display search bar
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  function handleDisplaySearchBar() {
    setIsSearchBarActive(!isSearchBarActive);
  }

  return (
    <div>
      <div className="bg-navBlue h-50 flex justify-around items-center ">
        {!isBurgerMenuOpen && <PictoBeer onClick={handleDisplayBurger} />}
        {isBurgerMenuOpen && (
          <PictoBeerAnimation onClick={handleDisplayBurger} />
        )}
        {/* Logo */}
        <Logo />

        {/* Display search bar */}
        <div className="flex justify-between  w-20">
          <img
            onClick={handleDisplaySearchBar}
            className="h-8 w-8"
            src="src/assets/loupe.png"
            alt="icone loupe"
          />
          {isSearchBarActive && <SearchBar />}

          {/* Shopping cart icon */}
          {!isSearchBarActive && (
            <img
              className="h-8 w-8 "
              src="src/assets/panier.png"
              alt="icone panier"
            />
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  isBurgerMenuOpen: PropTypes.bool.isRequired,
  handleDisplayBurger: PropTypes.func.isRequired,
};

export default Header;
