import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";
import { useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../../../slices/api";
import { useState } from "react";

export default function OrdersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setorders] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchorders = async () => {
    try {
      const res = await axios.get(`${url}/orders`, setHeaders());
      setorders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchorders();
  }, []);

  const rows =
    orders &&
    orders.map((item) => {
      return {
        id: item._id,
        name: item.shipping.name,
        paymentStatus: item.payment_status,
        deliveryStatus: item.delivery_status,
        createdAt: item.createdAt,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Nombre de la Persona",
      width: 200,
    },
    { field: "paymentStatus", headerName: "Pago", width: 80 },
    {
      field: "deliveryStatus",
      headerName: "Envío",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "Creado En",
      width: 115,
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete>Delete</Delete>
            <Update> Edit</Update>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelectison
        disableSelectionOnClick
      />
    </div>
  );
}

const Actions = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: space-around;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const Update = styled.button`
  background-color: #4b70e2;
`;
