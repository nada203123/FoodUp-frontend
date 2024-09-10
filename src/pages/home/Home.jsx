// Home.jsx
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../../components/CategorySlider";
import { FaPlus } from "react-icons/fa";
import "./Home.css";
import useUserStore from "../../utilities/store/userStore";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const {user,isAuthenticated}=useUserStore()
  console.log("🚀 ~ Home ~ isAuthenticated:", isAuthenticated)
  console.log("🚀 ~ Home ~ user:", user)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5198/api/categories");
        console.log(response)
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

  return (
    <div className="home">
      
      <CategorySlider categories={categories} />
    </div>
  );
};

export default Home;
