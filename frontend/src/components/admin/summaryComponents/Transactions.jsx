import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders, url } from "../../../slices/api";
import moment from "moment";
import "moment/locale/es";

const Transactions = () => {
  const [oders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/orders?newOnes=true`, setHeaders());
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledTransaction>
      {loading ? (
        <p>Transactions Loading ...</p>
      ) : (
        <>
          <h3>Latest Transactions </h3>
          {oders &&
            oders.map((order, index) => {
              return (
                <Transaction key={index}>
                  <p>{order.shipping.name}</p>
                  <p>${order.total.toLocaleString()}</p>
                  <p>{moment(order.createdAt).fromNow()}</p>
                </Transaction>
              );
            })}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transactions;

const StyledTransaction = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  background: rgba(38, 198, 249, 0.12);
  padding: 1rem;
  justify-content: space-between;
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
