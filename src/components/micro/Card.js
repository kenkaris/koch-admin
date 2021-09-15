import {  Paper,makeStyles, Button, ThemeProvider,TextField,InputAdornment,createMuiTheme, Card,CardActions, CardMedia, CardContent,DialogActions,Dialog,DialogContent, Chip, LinearProgress } from '@material-ui/core'
import { Delete,Cancel, Add } from '@material-ui/icons'
import { Badge, Carousel, Row,Col,Upload, Result } from 'antd'
import { useState,useContext,useEffect } from 'react'
import { Link } from 'react-router-dom';
import propertyContext from '../context/property/propetyContext'

export default function Home({item,rentals,admin}) {
  const [imageM,setImageM] = useState(false)
  const [one,setOne] = useState(false)
  const [two,setTwo] = useState(false)
  const [fileList,setFileList] = useState([])
  const [feature,setF] = useState('')
  const [price,setP] = useState('')
  const [features,setFeatures] = useState([])
  const [payment,setPayment] = useState([])
  const files = new FormData()
  const products = useContext(propertyContext)

  const { fetchProp,removeProp,fetchProducts,addProduct_p,addProduct_f,usePromiseTracker } = products
  const { promiseInProgress } = usePromiseTracker({area:"ADDITEMF"})
  const { promiseInProgress: adding } = usePromiseTracker({area:"ADDITEMP"})
  const changeF = (a) => {
    setF(a.target.value);
  };
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
  const props = {
    onChange: file => {
      setFileList([...file.fileList]);
       //return false;
     },
    onRemove: file => {
     setFileList(() => {
       return fileList.filter( item => item.uid !== file.uid )
     })
    },
    beforeUpload: file => {
      files.append('props',file)
      setFileList([...fileList,file]);
       //return false;
     },
     progress: {
      strokeColor: {
        '0%': '#000',
        '100%': '#fdc30f',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
     fileList,

 
  };
  
  const useStyles = makeStyles( theme => ({
    card:{
        background:'white'
    },
    btn:{
      textTransform:'initial',
      width:'100%',
      margin:10
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
   const cancel = () => {
     fetchProducts()
    setImageM(!imageM)
   }
   const uploadF = () => {
    let data = {
      id: item._id,
      features: features
    }
    addProduct_f(data)
    setF([])
  }
  const uploadP = () => {
   let data = {
     id: item._id,
     payment: payment
   }
   addProduct_p(data)
   setP([])
  }
  return (
        <ThemeProvider theme={theme}>
           <Card className={classes.card} elevation={0}>
          <CardMedia >
           {
             item.images ? 
             <div style={{backgroundImage:`url(http://localhost:3001${item.images[0]})`,backgroundPosition:'center',backgroundSize:'cover',height:250}}></div>
             :
             <Result 
             status="404"
             title="404"
             subTitle="please add product images " 
            />
           }
          </CardMedia>
         <a>
         <CardContent>
          <Row justify="start">
          <span style={{fontSize:13,color:'GrayText'}}>{ item.category === "sale" ? "For sale:" :"For Rent:"  } price</span>
            </Row>
            <Row justify="start">
           <span style={{fontSize:17,fontWeight:400,color:'black'}}>{item.price}</span>
          </Row>
          <Row justify="start">
           <span style={{fontSize:15,color:'black'}}>{item.rooms}</span>
          </Row>
          <Row justify="start">
           <span style={{fontSize:13,color:'GrayText'}}>{item.location}</span>
          </Row>
          <Row justify="start">
           <span style={{fontSize:15,color:'black'}}>{item.description}</span>
          </Row>
          <div>
           
           <Button className={classes.btn} color="primary" size="small" onClick={() => setImageM(!imageM)} variant="contained">Upload images</Button>
        
           <Button className={classes.btn} color="primary" size="small" onClick={() => setOne(!one)} variant="contained">Upload features</Button>
        
           <Button className={classes.btn} color="primary" size="small" onClick={() => setTwo(!two)} variant="contained">Upload payment overview</Button>
        
           <Button className={classes.btn} color="primary" size="small" onClick={() => removeProp(item._id)} variant="contained" >delete asset</Button>
         </div>
          </CardContent>
         </a>
         
       
        </Card>
        <Dialog open={imageM} >
       <div style={{padding:20}}>
        <Upload  {...props} listType="picture-card" style={{marginTop:10}}  multiple={true} name="prop-images" action={`http://localhost:3001/upload-prop-img/${item._id}`}>
        upload
         </Upload>
      <DialogActions>
            <Button variant="outlined" style={{textTransform:'initial'}} onClick={cancel} startIcon={<Cancel />}>Cancel</Button>
           
        </DialogActions>
        </div>
      </Dialog>
      <Dialog open={one}>
            <div>
              {
                promiseInProgress && <LinearProgress color="primary" />
              }
            <div style={{padding:10}}>
          <TextField variant="outlined" style={{width:'100%'}}
          onChange={changeF}
          value={feature}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  Feature:
               </InputAdornment> }}
            color="primary" label="asset features" size="small" placeholder="Enter feature and click enter .. " />
            <Button size="small" color="primary" variant="contained" disabled={feature === '' ? true : false} style={{marginTop:5}} onClick={addF}>add feature</Button>
            {
                features.length !== 0 &&
                features.map( p => (
              <Chip
              key={p}
              variant="contained"
              clickable
              label={p}
              style={{margin:5}}
              onDelete={
                () => setFeatures(features.filter( item => item !== p ))
              }
              />
                ) )
              }
              <br />
              {item.features &&  
              <span style={{margin:5,color:'green',fontSize:13}}>
                   Already uploaded features ::
                  </span>}
                  <br />
              {
                item.features ? 
                item.features.map( item => (
                  <span style={{margin:5,color:'#d22f25',fontSize:13}}>
                    {item}
                  </span>
                ) )
                :
                <span style={{margin:5,color:'#d22f25',fontSize:13}}>
                This property has no features.Please upload some.
              </span>
              }
          </div>
         
            </div>
            <DialogActions>
            <Button variant="outlined" style={{textTransform:'initial'}} onClick={() => setOne(!one)} startIcon={<Cancel />}>Cancel</Button>
            <Button variant="outlined" style={{textTransform:'initial'}} onClick={uploadF} startIcon={<Add />}>Upload</Button>
        </DialogActions>
          </Dialog>
          <Dialog open={two}>
            <div>    
            {
                adding && <LinearProgress color="primary" />
              }
          <div style={{padding:10}}>
          <TextField variant="outlined" style={{width:'100%'}}
           onChange={changeP}
           value={price}
           InputProps={{
               startAdornment: <InputAdornment position="start">
                  payment:
               </InputAdornment> }}
            color="primary" label="price overview" size="small" placeholder="Enter price overview.. " />
              <Button size="small" color="primary" disabled={price === '' ? true : ''} variant="contained" style={{marginTop:5}} onClick={addP}>add payment</Button>
              {
                payment.length !== 0 &&
                payment.map( p => (
              <Chip
              key={p}
              variant="contained"
              clickable
              label={p}
              style={{margin:5}}
              onDelete={
                () => setPayment(payment.filter( item => item !== p ))
              }
              />
                ) )
              }
              <br />
              {item.features &&  
              <span style={{margin:5,color:'green',fontSize:13}}>
                   Already uploaded overview ::
                  </span>}
                  <br />
              {
                item.payment ? 
                item.payment.map( item => (
                  <span style={{margin:5,color:'#d22f25',fontSize:13}}>
                    {item}
                  </span>
                ) )
                :
                <span style={{margin:5,color:'#d22f25',fontSize:13}}>
                This property has no features.Please upload some.
              </span>
              }
          </div>
            </div>
            <DialogActions>
            <Button variant="outlined" style={{textTransform:'initial'}} onClick={() => setTwo(!two)} startIcon={<Cancel />}>Cancel</Button>
            <Button variant="outlined" style={{textTransform:'initial'}} onClick={uploadP} startIcon={<Add />}>Upload</Button>
        </DialogActions>
          </Dialog>
        </ThemeProvider>
        
  )
}
