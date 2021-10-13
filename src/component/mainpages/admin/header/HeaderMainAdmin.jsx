import React from 'react'
import { Link} from 'react-router-dom'

const HeaderMain = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary" style = {{marginBottom: '10px'}}>
           <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin">Dashboard</Link>
                </li>
            </ul> 
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Category</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/store" role="option">Store list</Link></li>
                        <li><Link to="/admin/supplier" role="option">Supplier</Link></li>
                        <li><Link to="/admin/saleChannel" role="option">Sale channel</Link></li>
                        <li><Link to="/admin/brand" role="option">Brand list</Link></li>
                        <li><Link to="/admin/UOM" role="option">List of UOM</Link></li>
                    </ul>
                </li>
            </ul>
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >User</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/user" role="option">User</Link></li>
                        <li><Link to="/admin/userGroup" role="option">User group</Link></li>
                        <li><Link to="/admin/userRole" role="option">User role</Link></li>
                    </ul>
                </li>
            </ul>
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Notification</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/notiTemplate" role="option">Template</Link></li>
                        <li><Link to="/admin/notiManage" role="option">Notification management</Link></li>
                    </ul>
                </li>
            </ul>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Merchandise</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/category" role="option">Category - Master</Link></li>
                        <li><Link to="/admin/merchandise" role="option">Merchandise - Master</Link></li>
                    </ul>
                </li>
            </ul>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Campaign</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/action" role="option">Action</Link></li>
                        <li><Link to="/admin/campaign" role="option">Campaign</Link></li>
                    </ul>
                </li>
            </ul>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Promotion</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/gift" role="option">Gift</Link></li>
                        <li><Link to="/admin/promotion" role="option">Promotion</Link></li>
                    </ul>
                </li>
            </ul>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link text-white dropdown-toggle"  data-toggle="dropdown" >Report</Link>
                    <ul className="dropdown-menu" role="listbox">
                        <li><Link to="/admin/saleReport" role="option">Sale report</Link></li>
                        <li><Link to="/admin/customerReport" role="option">Customer report</Link></li>
                        <li><Link to="/admin/productReport" role="option">Product report</Link></li>
                        <li><Link to="/admin/categoryReport" role="option">Category report</Link></li>
                    </ul>
                </li>
            </ul>

        </nav>
    ); 
}

export default HeaderMain
