"use client";

import React, { useState } from "react";
import Header from "./components/header";
import FoodGrid from "./components/body";
import Footer from "./components/footer";


const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header
        setActiveCategory={setActiveCategory}
        setSearchQuery={setSearchQuery}
      />
      <FoodGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      <Footer/>
    </div>
  );
};

export default App;
