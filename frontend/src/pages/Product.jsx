import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../css/Product.css";
import { refreshComponent, manageAdmin } from "../slice/InveSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Product = () => {
  const [isDelete, setisDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const autoRefresh = useSelector((state) => state.products.refresh);
  const adjustAdmin = useSelector((state) => state.products.admin);

  const [table, setTable] = useState([]);
  const [inputdata, setInputData] = useState({
    item_id: "",
    item_name: "",
    item_category: "",
    current_stock: "",
    price: "",
    item_type: "",
    hsn_code: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setInputData({ ...inputdata, [event.target.name]: event.target.value });
  };

  const displayData = () => {
    axios
      .get("https://inventory-management-system-api-hkw5.onrender.com/productsDetails/api/v1/products")
      .then((res) => {
        console.log(res.data.data);
        setTable(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleadd = () => {
    let authToken = localStorage.getItem("token");
    axios
      .post(
        "https://inventory-management-system-api-hkw5.onrender.com/productsDetails/api/v1/products",
        inputdata,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setInputData(response.data.data);
        dispatch(refreshComponent());
        setOpen(false);
      })

      .catch((err) => {
        console.log(err);
      });

    setInputData({
      item_id: "",
      item_name: "",
      item_category: "",
      current_stock: "",
      price: "",
      item_type: "",
      hsn_code: "",
    });

    toast.success("Product add successfully!", {
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

  //go to edit page
  const redirectEditPage = (_id) => {
    navigate(`/edit/${_id}`);
  };

  const handleDelete = (id) => {
    let data = {
      _id: id,
    };
    let authToken = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${authToken}`,
    };
    axios
      .delete("https://inventory-management-system-api-hkw5.onrender.com/productsDetails/api/v1/products", {
        headers,
        data,
      })
      .then((res) => {
        //dispatch(manageAdmin());
        setisDelete(!isDelete);
        dispatch(refreshComponent());
      })
      .catch((err) => {
        console.log(err);
      });
    toast.success("Product is Deleted!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    displayData();
  }, [autoRefresh, adjustAdmin, isDelete]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1 style={{ marginTop: "35px" }}>Inventory</h1>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              Add Item(s)
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Items
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter item id"
                    value={inputdata.item_id}
                    name={"item_id"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter item name"
                    value={inputdata.item_name}
                    name={"item_name"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>

                  <select
                    className="dropdownMenu"
                    placeholder="Item Category"
                    value={inputdata.item_category}
                    name={"item_category"}
                    onChange={handleChange}
                  >
                    <option value="Electronic">Electronic</option>
                    <option value="Cloths">Cloths</option>
                    <option value="Gym Products">Gym Products</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Gadgets">Gadgets</option>
                  </select>
                  <br></br>
                  <br></br>

                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Item current stock"
                    value={inputdata.current_stock}
                    name={"current_stock"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter price"
                    value={inputdata.price}
                    name={"price"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter nature of Item"
                    value={inputdata.item_type}
                    name={"item_type"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter HSN Code"
                    value={inputdata.hsn_code}
                    name={"hsn_code"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleadd}
                  >
                    {" "}
                    Add
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
                </Typography>
              </Box>
            </Modal>
          </Stack>
          <br></br>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ background: "#0DF3EF" }}>
                  <TableCell align="center">ITEM ID #</TableCell>
                  <TableCell align="center">ITEM NAME</TableCell>
                  <TableCell align="center">ITEM CATEGORY</TableCell>
                  <TableCell align="center">CURRENT STOCK</TableCell>
                  <TableCell align="center">PRICE</TableCell>
                  <TableCell align="center">TYPE</TableCell>
                  <TableCell align="center">HSN CODE</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.item_id}</TableCell>
                    <TableCell align="center">{row.item_name}</TableCell>
                    <TableCell align="center">{row.item_category}</TableCell>
                    <TableCell align="center">{row.current_stock}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.item_type}</TableCell>
                    <TableCell align="center">{row.hsn_code}</TableCell>
                    <TableCell align="center">
                      <img
                        width="30px"
                        height="30px"
                        src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-Edit-virtual-keyboard-others-inmotus-design.png"
                        onClick={() => redirectEditPage(row._id)}
                      />
                      <img
                        width="30px"
                        height="30px"
                        src="https://img.icons8.com/fluency/48/null/delete-forever.png"
                        onClick={() => handleDelete(row._id)}
                      />
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
                        theme="colored"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default Product;
