import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { productDetails } from "../slices/productDetails";
import { addToCart, getTotals } from "../slices/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    dispatch(productDetails(productId));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  const product = useSelector((state) => state.productDetails.product);

  return (
    <div className="container-product-details">
      <img src={product?.image?.url} alt="" />
      <div className="product-content">
        <h4>{product.name}</h4>
        <h5>${product.price}</h5>

        <p>{product.details}</p>

        {addedToCart ? (
          <button className="added-to-cart">Added to Cart</button>
        ) : (
          <button
            className="add-cart-btn-details"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
