import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../../../slices/api";
import { useState } from "react";

export default function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/users`, setHeaders());
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const rows =
    users &&
    users.map((item) => {
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        isAdmin: item.isAdmin,
        createdAt: item.createdAt,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "isAdmin",
      headerName: "Es Admin",
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
