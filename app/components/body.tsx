"use client";

import React, { useEffect, useState } from "react";
import styles from "./body.module.css";
import axios from "axios";

interface FoodItem {
  id: number;
  name: string;
  image: string | undefined;
  mealType: string;
  ingredients: string[];
  instructions: string[];
}

interface FoodGridProps {
  activeCategory: string;
  searchQuery: string;
}

const FoodGrid: React.FC<FoodGridProps> = ({ activeCategory, searchQuery }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const itemsPerPage = 6; // Show 6 items per page
  const [selectedRecipe, setSelectedRecipe] = useState<FoodItem | null>(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        setFoodItems(response.data.recipes); // Adjust to the actual API structure
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      !activeCategory ||
      (Array.isArray(item.mealType) &&
        item.mealType.some(
          (type) => type.toLowerCase() === activeCategory.toLowerCase()
        ));
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate the items to display for the current page
  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredItems.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (selectedRecipe) {
    return (
      <section className={styles.recipeDetails}>
        <button
          onClick={() => setSelectedRecipe(null)}
          className={styles.backButton}
        >
          Back
        </button>
        <div className={styles.recipeContent}>
          <div className={styles.imageContainer}>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className={styles.recipeImage}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.recipeTitle}>{selectedRecipe.name}</h2>
            <h3>Ingredients</h3>
            <ol className={styles.ingredientsList}>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ol>
            <h3>Instructions</h3>
            <ol className={styles.instructionsList}>
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.foodGridContainer}>
      <div className={styles.foodGrid}>
        {currentItems.map((item) => (
          <div
            key={item.id}
            className={styles.foodCard}
            onClick={() => setSelectedRecipe(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className={styles.foodImage}
            />
            <h3 className={styles.foodName}>{item.name}</h3>
          </div>
        ))}
      </div>
      <div className={styles.paginationArrows}>
        <button
          className={styles.arrowButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <button
          className={styles.arrowButton}
          onClick={handleNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= filteredItems.length}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default FoodGrid;
