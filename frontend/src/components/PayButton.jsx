import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../slices/api";

const PayButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    await axios.post(`${url}/order/checkout`, cartItems).then((res) => {
      if (res) {
        window.location.href = res.data.checkoutUrl;
      }
    });
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>
        Continue with the Check Out
      </button>
    </>
  );
};

export default PayButton;
