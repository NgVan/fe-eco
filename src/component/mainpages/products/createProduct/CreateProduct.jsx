import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
//import Select from 'react-select';
import axios from 'axios'
import queryString from 'query-string'

import { addProduct, getPros } from '../../../../actions/productActions';
//import { GET_CATEGORY } from '../../../../actions/types';
import HeaderMain from '../../headerMain/HeaderMain';
import Loading from '../../utils/loading/Loading'
import './createProduct.css'


CreateProduct.propTypes = {
    
};

const server_URL = "https://be-store.herokuapp.com"

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct(props) {
    const dispatch = useDispatch();
    let history = useHistory();

    const [ product, setProduct ] = useState(initialState)
    const [ loading, setLoading ] = useState(false)
    const [ images, setImages ] = useState(false)
    const [ category, setCategory ] = useState([])

    const typingTimeoutRef = useRef(null)


    useEffect(() => {
        async function getCategories() {
            const res = await axios.get(`${server_URL}/api/category`);
            console.log("CATEGORY RES: ", res.data.categories)
            const { categories } = res.data
            const categoryName = categories.map(n => {
                return n.name
            });
            setCategory(categoryName)   
        }
        getCategories();
    }, [])

    //console.log("Category CHECK: ",category)

    const handleChangeInput = e => {
        const {name, value} = e.target

        if(typingTimeoutRef.current)
            clearTimeout(typingTimeoutRef.current);
        
        setProduct({...product, [name]:value})
        
        typingTimeoutRef.current = setTimeout(() => {
            
            //console.log("Event target: ", e.target)
            console.log("Event target name: ", name)
            console.log("Event target value: ", value)
        }, 500)
    }

 const onFormSubmit = async event => {
        event.preventDefault();

        try {
            if(!images) return alert("No Image Upload")

            const newProduct = {...product, images}
            console.log("NEWPRODUCT: ", newProduct)

            await dispatch(addProduct(newProduct));
            history.push("/Product");
            const Q = {
                page: 1, 
                limit: 5
            }
            const paramQ = queryString.stringify(Q)
            dispatch(getPros(paramQ))

        } catch (error) {
            alert(error.response.data.msg)
        }
        
    }

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post(`${server_URL}/api/upload`, formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: localStorage.getItem("JWT_TOKEN")}
            })
            //console.log("RES IMAGE: ",res.data)
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post(`${server_URL}/api/destroy`, {public_id: images.public_id}, {
                headers: {Authorization: localStorage.getItem("JWT_TOKEN")}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div>
            <HeaderMain />
            <h5>Add product</h5> <br />
            <div className="create_product">
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                    {
                        loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.secure_url : ''} alt=""/>
                            <span onClick={handleDestroy}>X</span>
                        </div>
                    }
                </div>

                <form onSubmit={onFormSubmit}>
                    <div className="row">
                        <label >Product ID:</label> 
                        <input type='text' placeholder='product_id' name='product_id' 
                        onChange={handleChangeInput} value={product.product_id} />
                    </div>

                    <div className="row">
                        <label >Product name:</label> 
                        <input type='text' placeholder='title' name='title' 
                        onChange={handleChangeInput} value={product.title}/>
                    </div>  

                    <div className="row">
                        <label >Description:</label> 
                        <input type='text' placeholder='description' name='description' 
                        onChange={handleChangeInput} value={product.description}/>
                    </div> 

                    <div className="row">    
                        <label >Content:</label> 
                        <input type='text' placeholder='content' name='content' 
                        onChange={handleChangeInput} value={product.content}/>
                    </div>

                    <div className="row">    
                        <label>Category:</label> 
                        <select className="custom-select" name='category' onChange={handleChangeInput}>
                            {category.map(n => (
                                <option  value={n}>{n}</option>
                            ))}
                            
                        </select>
                    </div>

                    <div className="row">    
                        <label >Price:</label> 
                        <input type='text' placeholder='price' name='price' 
                        onChange={handleChangeInput} value={product.price}/>
                    </div>
                    
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;