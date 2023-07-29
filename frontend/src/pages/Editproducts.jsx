import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { refreshComponent } from "../slice/InveSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editproducts = () => {
  let { _id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    item_id: "",
    item_name: "",
    item_category: "",
    current_stock: "",
    price: "",
    item_type: "",
    hsn_code: "",
  });

  const autoRefresh = useSelector((state) => state.products.refresh);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  //display product:

  useEffect(() => {
    let authToken = localStorage.getItem("token");
    axios
      .get(`http://localhost:2000/productsDetails/api/v1/products/${_id}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEdit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [autoRefresh]);

  //edit product:

  const populateData = () => {
    let authToken = localStorage.getItem("token");
    axios
      .patch("http://localhost:2000/productsDetails/api/v1/products", edit, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEdit(res.data.data);
        dispatch(refreshComponent());
      })
      .catch((err) => {
        console.log(err);
      });

    toast.success("Product update Successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const gotoproduct = () => {
    navigate("/product");
  };

  return (
    <div className="form">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Navbar />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <h1 style={{ marginTop: "60px" }}>Edit Product</h1>

          <TextField
            id="Item Id"
            label="Item Id"
            variant="outlined"
            value={edit.item_id}
            name={"item_id"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Item Name"
            label="Item Name"
            variant="outlined"
            value={edit.item_name}
            name={"item_name"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Item Category"
            label="Item Category"
            variant="outlined"
            value={edit.item_category}
            name={"item_category"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Current Stock"
            label="Current Stock"
            variant="outlined"
            value={edit.current_stock}
            name={"current_stock"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Price"
            label="Price"
            variant="outlined"
            value={edit.price}
            name={" price"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Type"
            label="Type"
            variant="outlined"
            value={edit.item_type}
            name={"item_type"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="HSN Code"
            label="HSN Code"
            variant="outlined"
            value={edit.hsn_code}
            name={"hsn_code"}
            onChange={handleChange}
          />
          <br></br>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button variant="contained" color="success" onClick={populateData}>
              Update
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Button variant="contained" color="success" onClick={gotoproduct}>
              Go to product
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Editproducts;
