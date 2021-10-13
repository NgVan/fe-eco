import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import axios from 'axios'

import { GET_PRODUCT } from '../../../../../actions/types';
import { changeStatusProduct, deleteProduct, getPros } from '../../../../../actions/productActions';
import ProductTable from './dataTable/table/ProductTable';
import HeaderMainAdmin from '../../header/HeaderMainAdmin';
import ProductHeader from './header/ProductHeader';
import { Link } from 'react-router-dom';

import './Products.css';
import PaginationPage from './dataTable/pagination/PaginationPage';
import Search from './dataTable/search/Search';

Products.propTypes = {
    
};

const server_URL = "https://be-store.herokuapp.com"

function Products(props) {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRows: 1,
        totalPagiRows: 1
    })
    const [filters, setFilters] = useState({
        page:1,
        limit:5,
        "title[regex]": '',
        sort: ''
    })
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const headers = [
        { name: "Product Id", field: "id", sortable: false },
        { name: "Product name", field: "title", sortable: true },
        { name: "Active", field: "checked", sortable: true },
        { name: "Description", field: "description", sortable: false },
        { name: "Content", field: "content", sortable: false },
        { name: "Category", field: "category", sortable: true },
        { name: "Price", field: "price", sortable: true },
        { name: "Sold", field: "sold", sortable: true },
        { name: "Image", field: "image", sortable: false },
        { name: "Operation", field: "operation", sortable: false }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        async function getProducts() {
            const paramString = queryString.stringify(filters)
            //dispatch(getProducts(paramString));
            const res = await axios.get(`${server_URL}/api/product?${paramString}`)
            console.log("PRODUCT RES: ", res.data)
            const { products, paginatingProducts, pagination } = res.data
            dispatch({
                type: GET_PRODUCT,
                payload: paginatingProducts
            })

            setPagination(pagination)
        }
        getProducts();
    }, [filters])

    const productList = useSelector(state => state.product.products);
    //const activeId = useSelector(state => state.product.activeId);
    
    console.log("Product List: ", productList);
    //console.log("Active List: ", activeId);

    const handleProductClick = (product) => {
        console.log("PRODUCT INFO: ", product)
        dispatch(changeStatusProduct(product));
    }

    async function handleDEleteProduct(product) {
        const r = window.confirm("Do you want to delete product?")
        if (r == true) {
            console.log("PRODUCT WANT DEL: ", product)
            await dispatch(deleteProduct(product))
            setFilters ( {
                ...filters,
            })
        }
        else {
            console.log("You just cancel deleting product")
        }    
    }

    function handlePageChange(newPage) {
        console.log("NEW PAGINATION PAGE: ",newPage)
        setFilters({
            ...filters,
            page: newPage
        })
    }

    function handleProductSearch (newSearchText) {
        console.log("NEW SEARCH TEXT: ", newSearchText);
        setFilters({
            ...filters,
            page:1,
            "title[regex]": newSearchText.searchTerm
        })
    }

    function handleClearSearch () {
        console.log("CLEAR SEARCH");
        setFilters({
            page: 1,
            limit: 5
        })
    }
    
    function handleSortingChange (field, order) {
        console.log("Sort");
        // Dsc -> Asc  |   Asc -> Dsc
        setSorting({ field, order })
        const sortOrder = 
            sorting.order === "asc" ? `-${field}` : `${field}`
        setFilters({
            ...filters,
            page: 1,
            sort: sortOrder
        })
    }

    return (
        <div className="home-page">
            <HeaderMainAdmin />
            <ProductHeader />

            <Search 
                handleProductSearch={handleProductSearch} 
                handleProductSearchClear={handleClearSearch}
            />

            <div className="text-center">
                <Link to="/Product/Create" className="btn btn-primary" role="button">+ Add new product</Link>
                <Link to="/Product/Active" className="btn btn-primary" role="button">Active products</Link>
                <Link to="/Product/Import" className="btn btn-primary" role="button">Import products</Link>
                <Link to="/Product/Export" className="btn btn-primary" role="button">Export products</Link>             
            </div>

            <table className="table table-striped">
                <ProductTable  
                    headers={headers}
                    onSorting={handleSortingChange}
                />
                <tbody className='product-list'>
                    {productList.map(product => (
                        <tr>
                            <th scope="row" key={product._id}>
                                {product.product_id}
                            </th>
                            <td  
                                className={product.checked === true? 'active': ''}
                                onClick={() => handleProductClick(product)}>
                                    {product.title}
                            </td>
                            <td>{`${product.checked}`}</td>
                            <td>{product.description}</td>
                            <td>{product.content}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.sold}</td>
                            <td>
                                <img src={product.images.secure_url} alt="" width="30" height="40" />
                            </td>
                            <td >
                                <Link  to={`/Product/${ product._id }`} data-toggle="tooltip" data-placement="top" title="View & Update" className="fas fa-edit"></Link>&ensp;
                                <button onClick={() => handleDEleteProduct(product)} className="btn btn-outline-dark btn-sm fas fa-trash-alt"  data-toggle="tooltip" data-placement="top" title="Delete product"></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationPage
                pagination={pagination}
                onPageChange={handlePageChange} />
        </div>
    );
}

export default Products;