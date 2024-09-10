import React , { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryProduct.css";
import axios from "axios";
import useProductStore from "../../utilities/store/productStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




const CategoryProducts = () => {
  const { setSelectedProduct ,selectedProduct,  deleteProduct} = useProductStore();
  console.log("🚀 ~ CategoryProducts ~ selectedProduct:", selectedProduct)
  const navigate = useNavigate();
  const {categoryId} = useParams()
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5198/api/products/category/${categoryId}`);
        setProducts(response.data.products);
        console.log(response.data.products)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const handelNavigate = async (destination, product) => {
    await setSelectedProduct(product);
    navigate(destination);
  };
  const handleDelete = async (productId) => {
    console.log("id",productId);
    try {
      const response = await axios.delete(
        `http://localhost:5198/api/products/${productId}`,{
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      deleteProduct(productId);
      alert("Product deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product.");
    }
  };
  
  //console.log("🚀 ~ CategoryProducts ~ params:", products.Name)
  
  return (
    <div className="category-products">
      {products.map((product) => (
        <div key={product.id } className="product-card" >
          <div className="product-image" onClick={() => {
          handelNavigate(`/product/${product.id}`, product);
        }}>
            <img src={`http://localhost:5198/${product.image}`} alt={product.name} />
          </div>
          <div className="product-details">
            <h4 className="Namep"color="black">{product.name}</h4>

            <button onClick={() => {
                  handelNavigate(`/modify/${product.id}`, product);
                }} className="edit-product-button">
                <FaEdit className="edit-icon" />
              </button>
            
            <button onClick={() => handleDelete(product.id)} className="delete-product-button">
              <MdDelete className="delete-icon" />
              </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
