import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from "./component/headers/Header"

import SignIn from "./component/mainpages/auth/SignIn"
import SignUp from "./component/mainpages/auth/SignUp"
import ForgotPassword from "./component/mainpages/auth/ForgotPassword"
import ResetPassword from "./component/mainpages/auth/ResetPassword"

import Home from "./component/mainpages/home/Home"
import Dashboard from "./component/mainpages/dashboard/Dashboard"
import Products from "./component/mainpages/products/Products"
import AdminProducts from "./component/mainpages/admin/merchandise/products/Products"
import CreateProduct from "./component/mainpages/products/createProduct/CreateProduct"
import DetailProduct from "./component/mainpages/products/detailProduct/DetailProduct"

import DashboardAdmin from "./component/mainpages/admin/dashboard/DashboardAdmin"
import Category from "./component/mainpages/admin/merchandise/category/Category"

import NotFound from "./component/mainpages/utils/not_found/NotFound"


//import authGuard from './component/HOCs/authGuard'

import {useSelector} from 'react-redux'

const App = () => {
  const auth = useSelector(state => state.auth);
  const {isAuthenticated, isAdmin} = auth;

  //const jwtToken = localStorage.getItem("JWT_TOKEN")
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`

  return(
      <BrowserRouter>
        <Header />
        <div className = "container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Signin' component={isAuthenticated ? NotFound : SignIn} />
            <Route exact path='/signup' component={isAuthenticated ? NotFound : SignUp} />
            <Route exact path='/forgotPassword' component={isAuthenticated ? NotFound : ForgotPassword} />
            <Route exact path='/resetPassword/:token' component={isAuthenticated ? NotFound : ResetPassword} />

            <Route exact path='/Dashboard' component={(isAuthenticated && !isAdmin) ? Dashboard : NotFound} />
            <Route exact path='/admin' component={(isAuthenticated && isAdmin) ? DashboardAdmin : NotFound} />

            <Route exact path='/Product' component={!isAdmin ? Products : NotFound} />
            <Route exact path='/Product/Create' component={(isAuthenticated && !isAdmin) ? CreateProduct: NotFound} />
            <Route exact path='/Product/:productId' component={(isAuthenticated && !isAdmin) ? DetailProduct : NotFound} />
            
            <Route exact path='/admin/merchandise' component={(isAuthenticated && isAdmin) ? AdminProducts : NotFound} />
            <Route exact path='/admin/category' component={(isAuthenticated && isAdmin) ? Category : NotFound} />

          </Switch>
        </div>        
      </BrowserRouter>
  )
}

export default App;
