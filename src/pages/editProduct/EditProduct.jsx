import React, { useState } from "react";
import useProductStore from "../../utilities/store/productStore";
import axios from "axios";
import "./EditProduct.css";
import { useNavigate } from "react-router-dom";
import editprodcut from "../../assets/editproduct.png"

const EditProduct = () => {
  const { selectedProduct,  updateProduct,setSelectedProduct } = useProductStore();
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  const [image, setImage] = useState(selectedProduct ? selectedProduct.image : "");
  const [price, setPrice] = useState( selectedProduct ? selectedProduct.price : "");
  const [description, setDescription] = useState(selectedProduct ? selectedProduct.description : "");
  const [categories, setCategories] = useState(selectedProduct ? selectedProduct.categoryId: [] );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };


  const handelNavigate = async (destination, product) => {
    await setSelectedProduct(product);
    navigate(destination);
  };

console.log("slected product mta3 edit",selectedProduct)
  const handleUpdate = async () => {

    const updatedProduct = {
      name: name,
      description: description,
      price: price,
      image: image,
      categoryId: categories,
    }
   
    try {
      const response = await axios.put(
        `http://localhost:5198/api/products/${selectedProduct.id}`,
        {
          Name: name,
          Description: description,
          Price: price,
          Image: image,
          CategoryId: categories,
        },{
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          }}
      );
      console.log(selectedProduct.id)
      updateProduct(selectedProduct.id, updatedProduct);
      console.log(response);
      setSuccess("Product updated successfully.");
      setTimeout(() => {
        handelNavigate(`/category/${selectedProduct.categoryId}`, updatedProduct )

      }, 1000);
      } catch (error) {
      console.log(error);
      setError("Failed to update product.");
    }
  };

  

  return (
    <div className="edit-product-container">
      <div className="left-sidePe">
      <h2 className="titleeditP">Edit product</h2>
      <div  className='form-groupPe'>
      
      <div >
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div >
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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
      
      <div className="button-containere">
        <button className="buttonE" onClick={handleUpdate}>Update Product</button>
        
      </div>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </div>
    </div>
    <div className="right-sidePe">
        <img className='right-ImagePe' src={editprodcut} alt="signup" /> 
        </div>
        </div>
    

  );
};

export default EditProduct;
