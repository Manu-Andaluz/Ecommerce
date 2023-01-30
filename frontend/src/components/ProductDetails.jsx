import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { productDetails } from "../slices/productDetails";
import { addToCart } from "../slices/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productDetails(productId));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const product = useSelector((state) => state.productDetails.product);

  return (
    <div className="container-product-details">
      <img src={product?.image?.url} alt="" />
      <div className="product-content">
        <h4>{product.name}</h4>
        <p>${product.price}</p>

        <p>{product.details}</p>

        {product.sizes && (
          <form className="sizes-form">
            <h5>{product.sizes.length > 0 ? "Talles" : ""}</h5>
            <div className="sizes">
              {product.sizes.map((size) => {
                return (
                  <>
                    <label htmlFor={size}>{size.toUpperCase()}</label>
                    <input type="radio" name="talle" value={size} id={size} />
                  </>
                );
              })}
            </div>
          </form>
        )}

        <button
          className="add-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
