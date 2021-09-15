import React, { useState,useContext, useEffect } from 'react'
import {  Paper,makeStyles, Button, ThemeProvider,Dialog,DialogContent,MenuItem,DialogActions,TextField,InputAdornment,createMuiTheme,CardMedia, CardContent, Chip ,Box,LinearProgress} from '@material-ui/core'
import { Badge, Carousel, Row,Col,Form,Button as Btn, Space, notification } from 'antd'
import Card from './Card'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useForm } from 'antd/lib/form/Form'
import { Link } from 'react-router-dom';
import propertyContext from '../context/property/propetyContext'
import { Lock, SettingsApplicationsSharp,Home as Icon, Add, AirlineSeatReclineNormalOutlined } from '@material-ui/icons';


export default function Home() {

    const [form] = useForm()
    const [value, setValue] = useState(1);
    const [passcode, setPass] = useState('');
    const [open,setOpen] = useState(false)
    const [feature,setF] = useState('')
    const [price,setP] = useState('')
    const [features,setFeatures] = useState([])
    const [payment,setPayment] = useState([])
    const products = useContext(propertyContext)

    const { fetchProp,removeProp,fetchProducts,authenticated,login,addProduct,assets,usePromiseTracker,success,error } = products
    const { promiseInProgress} = usePromiseTracker({area:'GET_PRODUCTS'})
    const { promiseInProgress: adding } = usePromiseTracker({area:'ADDITEM'})
    const changeF = (a) => {
      setF(a.target.value);
    };
    useEffect(() => {
      fetchProducts()
    },[])
    useEffect(() => {
      if(error)
      notification.error({
        message:"Action Failed,try again",
        description:error,
        placement:"topLeft"
      })
    },[error])
    useEffect(() => {
      notification.success({
        message:"Action complete",
        description:success,
        placement:"topLeft"
      })
    },[success])
    const addP = () => {
      setPayment([...payment,price])
      setP('');
    };
    const addF= (a) => {
      setFeatures([...features,feature])
      setF('');
    };
    const changeP = e => {
      setP(e.target.value);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const onFinish = data => {
      console.log(data)
      addProduct(data)
     }
     const onFinishF = data => {
         console.log(data)
          }
  
  const useStyles = makeStyles( theme => ({
    paper:{
      padding:20,
      backgroundColor:'transparent',
      backdropFilter:'blur(40px)',
      [theme.breakpoints.up('md')]:{
        width:'50%'
      },
      [theme.breakpoints.down('down')]:{
        width:'70%'
      }
    },
    btn:{
      textTransform:'initial',
      margin:10
    },
    about:{
      marginTop:20,
      padding:25,
      fontSize:13,
      background:'#F5F5F5',
      color:'#5a2336',
      marginBottom:10
    }
    }) )
    const classes = useStyles()
    const theme = createMuiTheme({
      palette:{
          primary:{
            
              main:'#d22f25'
          },
          
          type: 'light'
      }
    })
    function TabPanel(props) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3} style={{padding:10}}>
              {children}
            </Box>
          )}
        </div>
      );
    }
  return (
        <ThemeProvider theme={theme}>
           <div>
     <div style={{padding:20,backgroundImage:'url(/admin.jpg)',backdropFilter:'blur(10px)',backgroundPosition:'center',backgroundSize:'cover'}}>
     <Row justify="center" style={{marginTop:20}}>
          <div style={{background:'white',padding:10,borderRadius:5}}>
          <span style={{color:'red',fontSize:15,fontWeight:'lighter',letterSpacing:1}}>
            Koch-properties admin panel
          </span>
          </div>
      </Row>
      <Row justify="center" style={{marginTop:20}}>
        {
          authenticated &&
          <Space>
       <a>
       <Button   startIcon={<Icon />} color="primary" variant="contained" size="small">back Home</Button>
       </a>
        <Button className={classes.btn} color="primary" variant="contained" startIcon={<Add />} onClick={() => setOpen(!open)} size="small">Add a new asset</Button>
        <Button className={classes.btn} color="primary" variant="contained"  onClick={() => fetchProducts()} size="small">reload</Button>
        </Space>
        }
      </Row>
        <Row justify="center" style={{overflowX:'hidden'}} style={{margin:10}} >
        <Paper square elevation={0}>
      {
        authenticated ? 
        <Tabs
        style={{borderRadius:5}}
         value={value}
         indicatorColor="primary"
         textColor="primary"
         onChange={handleChange}
         aria-label="disabled tabs example"
       >
         <Tab size="small" label="For sale" value={1}/>
         <Tab size="small" label="For rent" value={2}/>
         <Tab size="small" label="Blogs" value={3}/>
       </Tabs>
       :
      <div>
         <Row justify="center">
         <div style={{padding:20,borderRadius:5}}>
         <TextField variant="outlined" style={{width:'100%'}}
          value={passcode}
          onChange={e => setPass(e.target.value)}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  <Lock />
               </InputAdornment> }}
            color="primary" label="passcode" size="small" placeholder="Enter admin pass code" />
         </div>
         </Row>
              <Row justify="center">
              <Button  className={classes.btn} variant="contained" disabled={passcode.length < 7 ? true : false} color="primary" onClick={() => login(passcode)}>login</Button>
              </Row>
        </div>
    
      }
    </Paper>
    </Row>
  
     </div>
  
      {
        authenticated &&
        <TabPanel value={value} index={1}>
        <Row gutter={[10,10]}  style={{padding:10}}>
         {
           
             assets.map( item => (
             <>
               {
                 item.category === "sale" &&
                 <Col key={item._id} lg={8} md={12} sm={8} xs={24}>
                 <Card item={item} admin={true}/>
                 </Col>
               }
             </>
             ) )
         }
         </Row>
        </TabPanel>
      }
      {
        authenticated &&
        <TabPanel value={value} index={2}>
        <Row gutter={[10,10]}>
         {  
             assets.map( item => (
               <>
               {
                 item.category === "rent" &&
                 <Col key={item._id} lg={8} md={12} sm={8} xs={24}>
                 <Card item={item} admin={true}/>
                 </Col>
               }
             </>
             ) )
         }
         </Row>
        </TabPanel>
      }
       {
        authenticated &&
        <TabPanel value={value} index={3}>
        <Row gutter={[10,10]}>
         {  
             assets.map( item => (
               <>
               {
                 item.category === "rent" &&
                 <Col key={item._id} lg={8} md={12} sm={8} xs={24}>
                 <Card item={item} admin={true}/>
                 </Col>
               }
             </>
             ) )
         }
         </Row>
        </TabPanel>
      }
         </div>

         <Dialog open={open}>
         { adding &&  <LinearProgress  color="primary"/> }
          <div style={{padding:20}}>
          <Row justify="center">
               <span style={{marginBottom:10}}>Ad new Asset</span>
           </Row>
           <Form form={form} onFinish={onFinish} onFinishFailed={onFinishF}>
           <Form.Item name="rooms" rules={[{required:true,message:'please enter a room name ..'}]}>
           <TextField variant="outlined" style={{width:'100%'}}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  Rooms:
               </InputAdornment> }}
            color="primary" label="product name" size="small" placeholder="Enter room name .. " />
           </Form.Item>
          <Form.Item name="tagline" rules={[{required:true,message:'please enter tagline  ..'}]}>
          <TextField variant="outlined" style={{width:'100%'}}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  tagline:
               </InputAdornment> }}
            color="primary" label="product size" size="small" placeholder="Enter tagline .. " />
          </Form.Item>
           <Form.Item name="location" rules={[{required:true,message:'please enter location ..'}]}>
           <TextField variant="outlined" style={{width:'100%'}}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  location:
               </InputAdornment> }}
            color="primary" label="product color" size="small" placeholder="Enter product color .. " />
           </Form.Item>
           <Form.Item name="description" rules={[{required:true,message:'please enter  description ..'}]}>
           <TextField variant="outlined" style={{width:'100%'}}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  Description:
               </InputAdornment> }}
            color="primary" label="product desc" size="small" placeholder="Enter  description .. " />
           </Form.Item>
           <Form.Item name="category" rules={[{required:true,message:'please enter product category ..'}]}>
           <TextField
             style={{width:'100%'}}
             size="small"
             id="outlined-select-currency"
             select
             color="primary"
             label="category"
             helperText="Please select  category"
             variant="outlined"
           >
            <MenuItem value="sale">
                 For Sale
               </MenuItem>
               <MenuItem value="rent">
                 For Rent
               </MenuItem>
           </TextField>
           </Form.Item>
           <Form.Item name="price" rules={[{required:true,message:'Enter product price ..'}]}>
           <TextField  variant="outlined" style={{width:'100%'}}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  Price:
               </InputAdornment> }}
            color="primary" label="product price" size="small" placeholder="Enter product price .. " />
           </Form.Item>
         
           <Form.Item>
            <Btn type="text" htmlType="submit" loading={adding} style={{background:'#d22f25',color:'white'}} block>
              Add 
            </Btn>
           </Form.Item>
           </Form>
           
          </div>
          <DialogActions>
          <Button variant="outlined" style={{textTransform:'initial'}} onClick={() => setOpen(!open)} >Cancel</Button>
          </DialogActions>
          </Dialog>
         
        </ThemeProvider>
        
  )
}
