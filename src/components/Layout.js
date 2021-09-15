
import { Paper,Button, Typography,makeStyles } from '@material-ui/core';
import {  Col, Row, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React,{ Suspense,lazy } from 'react'
import { BrowserRouter as Router,Link,Route,Switch  } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";
import { Mail, Phone, PhoneOutlined } from '@material-ui/icons';
import PropertyState from './context/property/PropertyState';

const useStyles = makeStyles( theme => ({
link:{
  textDecoration:'none',
  fontSize:13,
  '&:hover':{
    transition:'0.6s',
    textDecoration:'underline',
    marginLeft:10
  }
}
}))

function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}
const Admin = lazy(() => retry(() => import('./micro/Admin')));
const Layout = () => {
  const classes = useStyles()
  
  
  return (
    <Router>
       <PropertyState>
      <Switch>
       <Suspense fallback={
       <div style={{marginTop:20}}>
          <Row justify="center">
        <Paper elevation={0} style={{padding:10,background:'white',marginTop:30}}>
       <Row justify="center" style>
        <Space>
        <LoadingOutlined style={{fontSize:25,color:'rerd'}} />
        </Space>
       </Row>
      </Paper>
     </Row>
       </div>
       }>
        <Route exact path="/admin"  component={Admin}/>
       </Suspense>
     </Switch>

    </PropertyState>
    </Router>
  )
}

export default Layout
