import React, {useEffect} from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import { GET_CATEGORY } from '../../../../../actions/types';
import "./category.css"

import HeaderMainAdmin from "../../header/HeaderMainAdmin"
Category.propTypes = {
    
};

const server_URL = "https://be-store.herokuapp.com"

function Category(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCategories() {
            const res = await axios.get(`${server_URL}/api/category`)
            console.log("CATEGORY RES: ", res.data)
            const { categories } = res.data
            dispatch({
                type: GET_CATEGORY,
                payload: categories
            })
            //setPagination(pagination)
        }
        getCategories();
    }, [])

    const categoriesList = useSelector(state => state.category.categories)

    return (
        <div>
            <HeaderMainAdmin />
            <h5>Category</h5>

            <div className="text-center" style={{marginBottom :"20px"}}>
                <Link to="/admin/category/add" className="btn btn-primary" role="button">+ Add new category</Link>
                <Link to="/admin/category/import" className="btn btn-primary" role="button">Import categories</Link>
                <Link to="/admin/category/export" className="btn btn-primary" role="button">Export categories</Link>             
            </div>

            <div className="category">
                {categoriesList.map(category => (
                    
                <ul className="list-group">
                    <li className="list-group-item">
                        
                            {category.name}
                        <div style={{padding:"0px 5px 0px 980px"}}>
                            <Link to={`/Product/`} data-toggle="tooltip" data-placement="top" title="Update" className="fas fa-edit" aria-hidden="true" >   </Link>&emsp;
                            <Link to={`/Product/`} data-toggle="tooltip" data-placement="top" title="View products" className="fas fa-eye" aria-hidden="true">   </Link>&emsp;
                            <Link to={`/Product/`} data-toggle="tooltip" data-placement="top" title="Delete" className="fas fa-trash-alt" aria-hidden="true" ></Link>
                        </div>
                    </li>
                </ul>    
                ))}
            </div>
        </div>
    );
}

export default Category;