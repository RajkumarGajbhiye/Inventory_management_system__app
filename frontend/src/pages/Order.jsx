import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { purple } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { refreshComponent } from "../slice/InveSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//modal style:

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

//Bootstrap Button:

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

//Color Button:

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const Order = () => {
  const autoRefresh = useSelector((state) => state.products.refresh);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [table, setTable] = useState([]);
  const [isDelete, setisDelete] = useState(false);

  const [inputdata, setInputData] = useState({
    orderId: "",
    order_date: "",
    order_item: "",
    quantity: "",
    price: "",
    totalPrice: "",
    supplier: "",
  });

  const handleChange = (event) => {
    setInputData({ ...inputdata, [event.target.name]: event.target.value });
  };

  //display order:

  const displayData = () => {
    axios
      .get("https://inventory-management-system-api-hkw5.onrender.com/admin/new/order")
      .then((res) => {
        console.log(res.data.data);
        setTable(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add order:

  const handleAdd = () => {
    let authToken = localStorage.getItem("token");
    axios
      .post("https://inventory-management-system-api-hkw5.onrender.com/admin/new/order", inputdata, {
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
      orderId: "",
      order_date: "",
      order_item: "",
      quantity: "",
      price: "",
      totalPrice: "",
      supplier: "",
    });
  };

  //payment:
  const handlepayment = async (amount) => {
    let show = { amount: amount };
    let purchase = await axios.post("https://inventory-management-system-api-hkw5.onrender.com/api/checkout", show);
    console.log(purchase.data.order.amount);
    const options = {
      key: "rzp_test_iUQGcGe7fxBsbO",
      amount: purchase.data.order.amount,
      currency: "INR",
      name: "RK",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/109793318?v=4",

      order_id: purchase.data.order.id,

      handler: function (response) {
        axios
          .post("https://inventory-management-system-api-hkw5.onrender.com/api/paymentVerification", response)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      prefill: {
        name: "Rajkumar Gajbhiye",
        email: "admin@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#1976d2",
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  //delete order:

  const handleDelete = (id) => {
    let data = {
      _id: id,
    };
    let authToken = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${authToken}`,
    };
    axios
      .delete("https://inventory-management-system-api-hkw5.onrender.com/admin/new/order", { headers, data })
      .then((res) => {
        setisDelete(!isDelete);
        dispatch(refreshComponent());
      })
      .catch((err) => {
        console.log(err);
      });
    toast.info("Order has Deleted!", {
      position: "bottom-right",
      autoClose: 2000,
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
          <h1 style={{ marginTop: "35px" }}>Order</h1>
          <BootstrapButton
            variant="contained"
            disableRipple
            onClick={handleOpen}
          >
            Place Order
          </BootstrapButton>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <TextField
                  label="Order Id"
                  color="secondary"
                  focused
                  type="text"
                  value={inputdata?.orderId}
                  name={"orderId"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Order Date"
                  color="secondary"
                  style={{ width: "220px" }}
                  type="date"
                  focused
                  value={inputdata?.order_date}
                  name={"order_date"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Order Item"
                  color="secondary"
                  focused
                  value={inputdata?.order_item}
                  name={"order_item"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Quantity"
                  type="number"
                  color="secondary"
                  focused
                  value={inputdata?.quantity}
                  name={"quantity"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Price"
                  type="number"
                  color="secondary"
                  focused
                  value={inputdata?.price}
                  name={"price"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Total Price"
                  type="number"
                  color="secondary"
                  focused
                  value={inputdata?.totalPrice}
                  name={"totalPrice"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <TextField
                  label="Supplier"
                  color="secondary"
                  focused
                  value={inputdata?.supplier}
                  name={"supplier"}
                  onChange={handleChange}
                />
                <br></br>
                <br></br>
                <ColorButton variant="contained" onClick={handleAdd}>
                  Send Order
                </ColorButton>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlepayment(inputdata.totalPrice)}
                >
                  Payment
                </Button>
              </Typography>
            </Box>
          </Modal>
          <Box>
            <br></br>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ background: "#DE3163" }}>
                    <TableCell align="center">ORDER ID</TableCell>
                    <TableCell align="center">ORDER DATE</TableCell>
                    <TableCell align="center">ORDER ITEM</TableCell>
                    <TableCell align="center">QUANTITY</TableCell>
                    <TableCell align="center">PRICE</TableCell>
                    <TableCell align="center">TOTAL PRICE</TableCell>
                    <TableCell align="center">SUPPLIER</TableCell>
                    <TableCell align="center">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{row.orderId}</TableCell>
                      <TableCell align="center">{new Date(row.order_date).toDateString()}</TableCell>
                      <TableCell align="center">{row.order_item}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.totalPrice}</TableCell>
                      <TableCell align="center">{row.supplier}</TableCell>
                      <TableCell align="center">
                        <img
                          width="30px"
                          height="30px"
                          src="https://img.icons8.com/fluency/48/null/delete-forever.png"
                          onClick={() => handleDelete(row._id)}
                        />
                        <ToastContainer
                          position="bottom-right"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="dark"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Order;
