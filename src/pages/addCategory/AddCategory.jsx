import React, { useState } from "react";
import "./AddCategory.css";
import useCategoryStore from "../../utilities/store/categoryStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import addfood from "../../assets/addFood.png"
const AddCategory = () => {
  const { addCategory } = useCategoryStore();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate()

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Please enter a name and make a photo ");
      return;
    }
    const newCategory = {
      Name: name,
      Image: image
    };
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Image", image);
    try {
      const response = await axios.post("http://localhost:5198/api/categories", formData,
      {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data', // Added Content-Type header
        },
      }
      );
      console.log(response);
      console.log(formData);
      addCategory(formData);
      setSuccess("Category added successfully.");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    } catch (error) {
      console.log(error);
      setError("Error while adding category.");
    }
  };

  return (
    <div className="add-category-container">
      <div className="left-sideC">
        <img className='left-ImageC' src={addfood} alt="signup" /> 
        </div>
    <div className="right-sideC">
      <h2 className="titleaddC">Add a category</h2>
      <div  className='form-groupC'> 
      
        
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        <div className="vertical-align">
        <button  type="submit" onClick={handleAddCategory}>Add</button>
      </div>
      </div>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
    </div>
  );
};

export default AddCategory;
