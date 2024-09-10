import React, { useState } from "react";
import "./EditCategory.css";
import useCategoryStore from "../../utilities/store/categoryStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import editcategory from "../../assets/editCategory.png"
const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };


const EditCategory = () => {
  const { updateCategory, selectedCategory} = useCategoryStore();
  console.log("🚀 ~ EditCategory ~ selectedCategory:", selectedCategory)
  const [name, setName] = useState(selectedCategory.name);
  const [image,setImage]=useState(selectedCategory.image)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  
  const handleUpdate = async () => {
    if (!name) {
      setError("Please enter a name");
      return;
    }

    const updatedCategory = {
      Name: name,
      Image:image,
    };

    try {
      const response = await axios.put(`http://localhost:5198/api/categories/${selectedCategory.id}`, {Name: name,
      Image:image},{
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      updateCategory(selectedCategory.id, updatedCategory);
      setSuccess("Updated category.");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    } catch (error) {
      console.log(error);
      setError("Failed to update Category.");
    }
  };

  
  return (
    <div className="edit-category-wrapper">
    <div className="image-container">
    <img src={editcategory} alt="Category Image" />
  </div>
    <div className="edit-category-container">
       <h2 className="titleeditC">Edit category</h2>
       <div  className='formEditC'>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          id="image"
        />
      </div>
      <div className="button-containerE">
        <button onClick={handleUpdate}>Update Category</button>
        
      </div>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
    </div> </div>
  );
};

export default EditCategory;
