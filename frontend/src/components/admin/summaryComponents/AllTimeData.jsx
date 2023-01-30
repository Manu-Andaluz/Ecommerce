import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders, url } from "../../../slices/api";

const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [income, setIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/orders/number`, setHeaders());
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/users/number`, setHeaders());
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIncome = async () => {
    try {
      const res = await axios.get(`${url}/orders/allTimeIncome`, setHeaders());
      setIncome(res.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchIncome();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loagindg All Data ...</p>
      ) : (
        <Main>
          <h3>All Data</h3>
          <Info>
            <Title>Users</Title>
            <Data>{users && users}</Data>
          </Info>
          <Info>
            <Title>Products</Title>
            <Data>{items && items.length}</Data>
          </Info>
          <Info>
            <Title>Orders</Title>
            <Data>{orders && orders}</Data>
          </Info>
          <Info>
            <Title>Earnings</Title>
            <Data>${income && income.total.toLocaleString()}</Data>
          </Info>
        </Main>
      )}
    </>
  );
};

export default AllTimeData;

const Main = styled.div`
  margin-top: 1rem;
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  background: rgba(38, 198, 249, 0.12);
  border-radius: 3px;
  padding: 0.5rem;
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
