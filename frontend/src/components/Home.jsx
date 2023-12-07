import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>All Products</h2>
          <div className="products">
            {data && data?.map((product) => <ProductItem product={product} />)}
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
