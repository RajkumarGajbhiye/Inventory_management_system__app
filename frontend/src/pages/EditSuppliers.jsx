import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { refreshComponent } from "../slice/InveSlice";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditSuppliers = () => {
  let { _id } = useParams();
const navigate= useNavigate()
  const [edit, setEdit] = useState({
    company: "",
    email: "",
    mobile_no: "",
    address: "",
    country: "",
    added_on: "",
  });

  const autoRefresh = useSelector((state) => state.products.refresh);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  //display supplier:

  useEffect(() => {
    let authToken = localStorage.getItem("token");
    axios
      .get(`https://inventory-management-system-api-hkw5.onrender.com/suppliersDetails/api/v1/suppliers/${_id}`, {
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

  //edit supplier:

  const populateData = () => {
    let authToken = localStorage.getItem("token");
    axios
      .patch("https://inventory-management-system-api-hkw5.onrender.com/suppliersDetails/api/v1/suppliers", edit, {
        headers: {
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
    toast.success("Supplier update successfully!", {
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

  const gotosupplier = () => {
    navigate("/suppliers");
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
          <h1 style={{ marginTop: "60px" }}>Edit Supplier</h1>
          <TextField
            id="Supplier Company"
            label="Supplier Company"
            variant="outlined"
            value={edit.company}
            name={"company"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            value={edit.email}
            name={"email"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Mobile No"
            label="Mobile No"
            variant="outlined"
            value={edit.mobile_no}
            name={"mobile_no"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Address"
            label="Address"
            variant="outlined"
            value={edit.address}
            name={"address"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Country"
            label="Country"
            variant="outlined"
            value={edit.country}
            name={"country"}
            onChange={handleChange}
          />
          <br></br>
          <TextField
            id="Added on"
            label="Added on"
            variant="outlined"
            value={edit.added_on}
            name={"added_on"}
            onChange={handleChange}
          />
          <br></br>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
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
             <Button variant="contained" color="success" onClick={gotosupplier}>
              Go to suppliers
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default EditSuppliers;
