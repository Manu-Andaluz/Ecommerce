import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>All Products</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`product/${product._id}`} className="link-img">
                    <img src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>An error occurred...</p>
      )}
    </div>
  );
};

export default Home;
