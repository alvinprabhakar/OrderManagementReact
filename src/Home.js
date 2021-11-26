import { Toolbar , AppBar , Box , Typography ,  IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';

//import {BrowserRouter, Switch , Route} from 'react-router-dom';
import OrderImg from './download.jpg';

import Link from '@material-ui/core/Link';
//import Order from './Order';


// import { Link as RouterLink } from 'react-router-dom';
// import ListItem from '@material-ui/core/ListItem';
   
//...



const styles = makeStyles(theme => ({
  loginRight: {
      marginLeft: 'auto',
    },
  imageSize: {
    margin: 'auto',
    height: 'auto',
    width: '100%',
  }
}))


function Home() {
  
  const classes = styles();
  
  return (
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.loginRight}>
            Order Management System 
          </Typography>
            <Link href="/orders" color="inherit" underline="none" className={classes.loginRight} >Login</Link>
         
          
        </Toolbar>
      </AppBar>
    </Box>

      
   
    {/* <Image className={classes.imageSize} src='https://blog.procurify.com/app/uploads/2018/03/ordermanagement.png'  />

    <Image className={classes.imageSize} src={require('./download.jpg')}/> */}

    <img className={classes.imageSize} src={OrderImg} alt="Not Loading"/>
    

    
    </>
  );
}

export default Home;
