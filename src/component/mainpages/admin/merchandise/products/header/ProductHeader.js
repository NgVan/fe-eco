import React from 'react'
import { Link} from 'react-router-dom'

const ProductHeader = () => {
    return (
        <div>
            <h5>Product Page</h5>

            <nav className="navbar navbar-expand-sm navbar-dark bg-info" style = {{marginBottom: '10px', marginTop: '10px'}}>
            <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/Product">Manage Products</Link>
                    </li>
                </ul> 
                
            <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/Product/Hot_Deal">Hot Deal</Link>
                    </li>
                </ul> 
                
                
            </nav>
        </div>
    ); 
}

export default ProductHeader
