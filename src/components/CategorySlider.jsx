import React,  {useEffect , useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./CategorySlider.css";
import useCategoryStore from "../utilities/store/categoryStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CategorySlider = () => {
  const navigate = useNavigate();
  const { categories, setSelectedCategory, fetchCategories } = useCategoryStore();
  const {  selectedCategory,deleteCategory } = useCategoryStore();
  
  console.log("🚀 ~ CategorySlider ~ categoriesss:", categories)
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setIsLoading(false); 
    };
    fetchData();
  }, [fetchCategories]);
  
  const handelNavigate = async (destination, category) => {
    await setSelectedCategory(category);
    navigate(destination);
  };

  if(isLoading){
    return <div>Data loading ....</div>
  }
  
  const handleDelete = async (categoryId) => {
    
    console.log("id",categoryId);
    console.log("🚀 ~ deleteCategory ~ selectedCategory:", selectedCategory)
    try {
      console.log("id in the try",categoryId);
      const response = await axios.delete(`http://localhost:5198/api/categories/${categoryId}`,{
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("response",response);
      deleteCategory(categoryId)
        alert("Deleted category");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Category");
    }
  };


  return (
    <div className="category-slider">
      <h2 className="welcome-text">Welcome to our store</h2>
      <div className="slider-wrapper">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <Link className="link" to={`/category/${category.id}`}>
              <img src={`http://localhost:5198/${category.image}`} alt={category.name} />
              <h3 className="category-name">{category.name}</h3>
            </Link>
            <Link
              to={`/editCategory/${category.id}`}
              on
              onClick={() =>
                handelNavigate(`/editCategory/${category.id}`, category)
              }
            >
              
              <button className="edit-category-button">
                <FaEdit className="edit-icon" />
              </button>
            </Link>
            <button onClick={() => handleDelete(category.id)} className="delete-category-button">
              <MdDelete className="delete-icon" />
              </button>

          </div>
          
        ))}
        
      </div>
    </div>
  );
};

export default CategorySlider;
