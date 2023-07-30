import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { refreshComponent } from "../slice/InveSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import moment from 'moment';

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

const Buyers = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setInputData({ ...inputdata, [event.target.name]: event.target.value });
  };

  const [table, setTable] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDelete, setisDelete] = useState(false);
  const autoRefresh = useSelector((state) => state.products.refresh);
  const [inputdata, setInputData] = useState({
    buyerCompany: "",
    email: "",
    mobile_no: "",
    address: "",
    country: "",
    added_on:"",
  });

 
  //display data:

  const displayData = () => {
    axios
      .get("https://inventory-management-system-api-hkw5.onrender.com/buyerDetails/api/v1/buyers")
      .then((res) => {
        console.log(res.data.data);
        setTable(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete buyers:

  const handleDelete = (id) => {
    let data = {
      _id: id,
    };
    let authToken = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${authToken}`,
    };
    axios
      .delete("https://inventory-management-system-api-hkw5.onrender.com/buyerDetails/api/v1/buyers", {
        headers,
        data,
      })
      .then((res) => {
        setisDelete(!isDelete);
        dispatch(refreshComponent());
      })
      .catch((err) => {
        console.log(err);
      });
    toast.success("Buyer is Deleted!", {
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

  //go to edit page:

  const redirectEditPage = (_id) => {
    navigate(`/editbuyers/${_id}`);
  };

  //add company:

  const handleadd = () => {
    let authToken = localStorage.getItem("token");
    axios
      .post("https://inventory-management-system-api-hkw5.onrender.com/buyerDetails/api/v1/buyers", inputdata, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
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
      buyerCompany: "",
      email: "",
      mobile_no: "",
      address: "",
      country: "",
      added_on: "",
    });

    toast.success("Buyer add successfully!", {
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

  useEffect(() => {
    displayData();
  }, [autoRefresh, isDelete]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1 style={{ marginTop: "35px" }}>Buyers</h1>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={handleOpen}>
              Add Company
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
                    placeholder="Enter Buyer Company"
                    value={inputdata.buyerCompany}
                    name={"buyerCompany"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Email"
                    value={inputdata.email}
                    name={"email"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>

                  <input
                    className="input"
                    type="number"
                    placeholder="Enter Buyers Mobile No"
                    value={inputdata.mobile_no}
                    name={"mobile_no"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Address"
                    value={inputdata.address}
                    name={"address"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Country"
                    value={inputdata.country}
                    name={"country"}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="input"
                    type="date"
                    placeholder="Enter date"
                    value={inputdata.added_on}
                    name={"added_on"}
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
                <TableRow sx={{ background: "#DE3163" }}>
                  <TableCell align="center">COMPANY</TableCell>
                  <TableCell align="center">EMAIL</TableCell>
                  <TableCell align="center">MOBILE NO</TableCell>
                  <TableCell align="center">ADDRESS</TableCell>
                  <TableCell align="center">COUNTRY</TableCell>
                  <TableCell align="center">ADDED ON</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.buyerCompany}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.mobile_no}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">{new Date(row.added_on).toDateString()}</TableCell>

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
    </>
  );
};

export default Buyers;
