import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { productEdit } from "../../slices/productsSlice";

export default function EditProduct({ productId }) {
  const dispatch = useDispatch();
  const { createStatus, items } = useSelector((state) => state.products);

  const [currentProduct, setCurrentProduct] = useState({});
  const [previusImg, setPreviusImg] = useState("");

  const [productImg, setProductImg] = useState("");
  const [category, setcategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setdetails] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviusImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productEdit({
        productImg,
        product: {
          ...currentProduct,
          name,
          category,
          price,
          details,
        },
      })
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProduct = items.find((item) => item._id === productId);

    setCurrentProduct(selectedProduct);
    setPreviusImg(selectedProduct.image.url);
    setProductImg("");
    setdetails(selectedProduct.details);
    setPrice(selectedProduct.price);
    setName(selectedProduct.name);
    setcategory(selectedProduct.category);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Create a Product</h3>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={handleProductImageUpload}
              />
              <select
                onChange={(e) => setcategory(e.target.value)}
                value={category}
                required
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Indumentary">Indumentary</option>
                <option value="Accessories">Accessories</option>
                <option value="Mates">Mates</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Short detailsription"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
                required
              />

              <PrimaryButton type="submit">
                {createStatus === "pending" ? "Submitting" : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previusImg ? (
                <>
                  <img src={previusImg} alt="error!" />
                </>
              ) : (
                <p>Product image upload preview will appear here!</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
