import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";

export default function ProductsList() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        name: item.name,
        details: item.details,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt={params.row.name} />
          </ImageContainer>
        );
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "details",
      headerName: "Details",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => dispatch(productDelete(params.id))}>
              Delete
            </Delete>
            <EditProduct productId={params.id} />
            <View onClick={() => navigate(`/product/${params.id}`)}>View</View>
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

const ImageContainer = styled.button`
  display: flex;
  margin: 0 auto;
  background-color: transparent;
  border: none;
  align-items: center;
  img {
    height: 40px;
  }
`;

const Actions = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const View = styled.button`
  background-color: rgb(126, 221, 2);
`;

const Update = styled.button`
  background-color: rgb(60, 21, 225);
`;
