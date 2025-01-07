"use client";

import React, { useState } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveCategory, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setSearchQuery(value); // Trigger real-time filtering
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyRecipeApp</div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for recipes..."
          className={styles.searchInput}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className={styles.searchButton}
          onClick={() => setSearchQuery(inputValue)}
        >
          Search
        </button>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.foodOptions}>
          <li
            className={styles.foodItem}
            onClick={() => setActiveCategory("Breakfast")}
          >
            Breakfast
          </li>
          <li
            className={styles.foodItem}
            onClick={() => setActiveCategory("Lunch")}
          >
            Lunch
          </li>
          <li
            className={styles.foodItem}
            onClick={() => setActiveCategory("Dinner")}
          >
            Dinner
          </li>
          <li
            className={styles.foodItem}
            onClick={() => setActiveCategory("Snacks")}
          >
            Snacks
          </li>
          <li
            className={styles.foodItem}
            onClick={() => setActiveCategory("Dessert")}
          >
            Desserts
          </li>
          <li className={styles.foodItem} onClick={() => setActiveCategory("")}>
            Show All
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
