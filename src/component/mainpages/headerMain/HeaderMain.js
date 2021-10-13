import React from 'react'
import { Link} from 'react-router-dom'

const HeaderMain = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-success" style = {{marginBottom: '10px'}}>
           <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/Dashboard">Homepage</Link>
                </li>
            </ul> 
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Setting</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="Store_management" role="option">Store management</Link></li>
                        <li><Link to="Notification" role="option">Notification</Link></li>
                        <li><Link to="Cost" role="option">Cost</Link></li>
                    </ul>
                </li>
            </ul>
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Maganement and Operation</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="Order" role="option">Oder management</Link></li>
                        <li><Link to="Product" role="option">Product management</Link></li>
                        <li><Link to="Category" role="option">Category management</Link></li>
                    </ul>
                </li>
            </ul>
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Report</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="Report_order" role="option">Order detail</Link></li>
                        <li><Link to="Report_product" role="option">Sale by product</Link></li>
                        <li><Link to="Report_category" role="option">Sale by category</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    ); 
}

export default HeaderMain
