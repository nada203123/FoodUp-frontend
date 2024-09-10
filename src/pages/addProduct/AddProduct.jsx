import React, { useState } from "react";
import "./AddProduct.css";
import useCategoryStore from "../../utilities/store/categoryStore";
import useProductStore from "../../utilities/store/productStore";
import axios from "axios";
import addproduct from "../../assets/addproduct.png"
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { categories } = useCategoryStore();
  const { addProduct } = useProductStore();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [CategoryId,setCategoryId]=useState(null)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const addOneProduct = async () => {
    const missingFields = [];
    if (!name) missingFields.push("Name");
    if (!image) missingFields.push("Image");
    if (!price) missingFields.push("Price");
    if (!description) missingFields.push("Description");
    if (!category) missingFields.push("Category");
    if (missingFields.length > 0) {
      setError(
        `Please fill out the following fields: ${missingFields.join(", ")}.`
      );
      return;
    }
    const newProduct = {
      Name: name,
      Image: image,
      Price: price,
      Description: description,
      CategoryId: CategoryId,
    };
    try {
      const response = await axios.post(
        "http://localhost:5198/api/products",
        newProduct,
      {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      }
      );
      console.log(response);
      addProduct(newProduct);
      setSuccess("Product added successfully.");
      setTimeout(() => {
        navigate("/")
      }, 1000);
    } catch (error) {
      console.log(error);
      setError("Failed to add product.");
    }
  };

  return (
    <div className="add-product-container">
      
      <div className="left-sideP">
      <h2 className="titleaddP">Add a product</h2>
      <div  className='form-groupP'> 
      <div className="NP">
      <div className="input-container">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <div className="category-dropdown">
          <button onClick={() => setShowDropdown(!showDropdown)}>
            {category || "Select a category"}
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.name);
                    setShowDropdown(false);
                    setCategoryId(cat.id)
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="button-container">
        <button className="button" onClick={addOneProduct}>Add </button>
      </div>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </div>
    </div>
    <div className="right-sideP">
        <img className='right-ImageP' src={addproduct} alt="signup" /> 
        </div>
    </div>
  );
};

export default AddProduct;

