import React, { useEffect , useState } from 'react';
import { Toolbar , AppBar , Box , Typography ,  IconButton ,
        TableContainer,Table,TableHead,TableRow,TableCell, TableBody , Button , TextField } from '@material-ui/core';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
//import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddOrder from './AddOrder';


const styles = makeStyles(theme => ({
  countCenter: {
    textAlign: 'center',
    },
  BoxAlign:{
    display:'flex'
  },
  AddOrder:{
    float: 'right',
    backgroundColor: '#19DBD4',
  },
  AddOrderPopUp:{
    display: 'inline-flex',
    justifyContent : 'center',
    marginTop: '3px',
    marginLeft: '50px',
    
  }
}))

function Order(){

  const classes = styles();

  const API_URL = "https://alvinprabhakar-omsapi.herokuapp.com/orders";

  const [ orderData , getOrderData] = useState([]);

  const [ totalOrder , getTotalOrder] = useState(0);

  const [ pendOrder , getPendOrder] = useState(0);

  const [ isOpen , setIsOpen ] = useState(false);

  const [ addOrder , getAddOrder ] = useState({products: '' , orderNo: '', Time: '' , Amount:'',
                                                mode:'', invoiceID:'',status:''});


 
  const getAllOrders = async () => {

    console.log("Get Orders Method Called");
    const {data} = await axios.get(API_URL);
    const totalOrders = await axios.get(`${API_URL}/totalorder`);
    console.log(data);
    console.log(totalOrders);
    getOrderData(data);
    getTotalOrder(totalOrders.data[0].totalOrders);
    getPendOrder(totalOrders.data[0].pendingOrders)
  }

  const addOrders = () => {
    console.log("Add Orders Method Called");
    setIsOpen(!isOpen);
  }

  const createOrders = async () => {

    console.log("Create Orders Method Called");
    const data = await axios.post(API_URL,addOrder);
    console.log(data);
  }

  const updateOrder = async (order) => {
    console.log("Update order Method Called");
    console.log(order);
    getAddOrder(order);
    console.log(addOrder);
    setIsOpen(!isOpen);    
  }

  const updateOrderDB = async (orderId) => {
    console.log("Update DB method Called");
    console.log(orderId , addOrder);
    const data = await axios.put(`${API_URL}/${orderId}`,{
                                        products: addOrder.products , 
                                        orderNo: addOrder.orderNo, 
                                        Time: addOrder.Time , 
                                        Amount: addOrder.Amount,
                                        mode:addOrder.mode, 
                                        invoiceID: addOrder.invoiceID,
                                        status:addOrder.status
    });
    console.log(data);
  }

  const deleteOrder = async (orderId) => {
    console.log("Delete order Method Called");
    const {data} = await axios.delete(`${API_URL}/${orderId}`);
    console.log(data);

    
  }

  useEffect( () => {
    console.log("use Effect Called");
    getAllOrders();
  }, [])

  const handleAddOrder = (e) => {
    getAddOrder({...addOrder,[e.target.name]:e.target.value})
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e);
  console.log(addOrder , orderData);
  let idDetail = orderData.filter(order => order._id === addOrder._id)
  console.log("ID Filter" , idDetail);
  if(idDetail.length !== 0)
      updateOrderDB(addOrder._id);
  else
      createOrders();
  setIsOpen(!isOpen);
  getAllOrders();
}

return(

        <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            List of Orders
          </Typography>  
        </Toolbar>
      </AppBar>
    </Box>

    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} align="center" >
            Manage Orders
          </Typography>
<Box className={classes.BoxAlign}>
    <Box sx={{
    width: 100,
    height: 100,
    marginLeft: '10px',
    borderRadius: '10%',
    backgroundColor: '#B9E4C9',
    '&:hover': {
      backgroundColor: 'green',
      opacity: [0.9, 0.8, 0.7],
    },
  }}>
    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className={classes.countCenter}>Total Orders</Typography>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.countCenter}>{totalOrder}</Typography>
    </Box>

    <Box sx={{
    width: 100,
    height: 100,
    marginLeft: '10px',
    borderRadius: '10%',
    backgroundColor: '#B9E4C9',
       '&:hover': {
      backgroundColor: 'green',
      opacity: [0.9, 0.8, 0.7],
    },
  }}>
    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }} className={classes.countCenter}>Pending Orders</Typography>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.countCenter}>{pendOrder}</Typography>
    </Box>
    </Box>

    <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} className={classes.AddOrder} 
            onClick={() => addOrders()}>Add orders</Button>

{isOpen && <AddOrder
      content={<>
        <Box  sx={{
    width: 700,
    height: 550, 
    margin: 'auto',
    backgroundColor: '#F5DEDB'
    }
  }>
        
        <Typography variant="h2" className={classes.countCenter}>Create/Update Orders</Typography>
        <form onSubmit={handleSubmit}>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Products" variant="outlined"  name="products" value={addOrder.products}
                     className={classes.AddOrderPopUp} onChange={handleAddOrder}/>
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Order No" variant="outlined"  className={classes.AddOrderPopUp} 
                    name="orderNo" value={addOrder.orderNo} onChange={handleAddOrder}/>
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Date" variant="outlined"  className={classes.AddOrderPopUp}
                    name="Time" value={addOrder.Time} onChange={handleAddOrder} />
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Amount" variant="outlined"   className={classes.AddOrderPopUp} 
                    name="Amount" value={addOrder.Amount} onChange={handleAddOrder}/>
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Mode" variant="outlined"  className={classes.AddOrderPopUp}
                    name="mode" value={addOrder.mode} onChange={handleAddOrder} />
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Invoice ID" variant="outlined"  className={classes.AddOrderPopUp} 
                    name="invoiceID" value={addOrder.invoiceID} onChange={handleAddOrder}/>
        </Box>
        <Box m='auto'>
        <TextField id="outlined-basic" label="Status" variant="outlined"  className={classes.AddOrderPopUp} 
                    name="status" value={addOrder.status} onChange={handleAddOrder}/>
        </Box>
        <Button variant="outlined" className={classes.AddOrderPopUp}  color="primary" type="submit">Submit</Button>
        </form>
        </Box>  

        
      </>}
     
    />}

    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Products</TableCell>
                    <TableCell>Order Number</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Mode</TableCell>
                    <TableCell>Invoice ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((order,index) => {
                return(
                  <TableRow key={index}>
                    <TableCell>{order.products}</TableCell>
                    <TableCell>{order.orderNo}</TableCell>
                    <TableCell>{order.Time}</TableCell>
                    <TableCell>{order.Amount}</TableCell>
                    <TableCell>{order.mode}</TableCell>
                    <TableCell>{order.invoiceID}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell><Button onClick={() => updateOrder(order)} startIcon={<EditIcon />}></Button>
                                <Button onClick={() => {deleteOrder(order._id) ; getAllOrders()}} startIcon={<DeleteIcon />}></Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
        </Table>
    </TableContainer>
                

   


        </>


    )
}

export default Order;   