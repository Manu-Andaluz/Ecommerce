import React, { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };
  return (
    <div key={product._id} className="product">
      <h3>{product.name}</h3>
      <Link to={`product/${product._id}`} className="link-img">
        <img src={product.image.url} alt={product.name} />
      </Link>
      <div className="details">
        <span>{product.desc}</span>
        <span className="price">${product.price.toLocaleString()}</span>
      </div>

      {addedToCart ? (
        <button className="added-to-cart-home">Added to Cart</button>
      ) : (
        <button
          className="add-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductItem;
