import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import HeaderMain from '../../headerMain/HeaderMain';
import './detailProduct.css'
import { EDIT_PRODUCT } from '../../../../actions/types';
import { editProduct } from '../../../../actions/productActions';
import Loading from '../../utils/loading/Loading'
import { useDispatch } from 'react-redux';

DetailProduct.propTypes = {
};

const server_URL = "https://be-store.herokuapp.com"

const initialState = {
    checked: true,
    sold: 0,
    _id: "60f3e6ee87a48b2d14a80dfd",
    product_id: "Sua001",
    title: "Product 00 aa",
    description: "Uong lanh",
    content: "Ngon",
    images: {
    public_id: "uploadAPI/ucdjz1o3opwb8mlv7na6",
    secure_url: "https://res.cloudinary.com/nvbchannel/image/upload/v1626596810/uploadAPI/ucdjz1o3opwb8mlv7na6.jpg"
    },
    category: "Ha Lan",
    price: 100
}

function DetailProduct(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const productId = props.match.params.productId;
    //console.log("PRO productId: ", productId)
    const [ detailProduct, setDetailProduct] = useState(initialState)
    const [ onEdit, setOnEdit ] = useState(false)
    //const [ product, setProduct ] = useState({})

    const [ loading, setLoading ] = useState(false)
    const [ images, setImages ] = useState(false)
    const [ category, setCategory ] = useState([])

    const typingTimeoutRef = useRef(null)

    useEffect(() => {
        try {
            async function getProduct() {
                const res = await axios.get(`${server_URL}/api/product/${productId}`)
                console.log("PRO DETAIL: ", res.data.product)
                const { product } = res.data
                console.log("DETAIL PRODUCT: ", product)
                setDetailProduct(product)
                setImages(detailProduct.images)
            }
            getProduct();
        } catch (error) {
            return error.message
        }
    }, [])

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

    function handleBack() {
        history.push("/Product")
    }
    function handleClickUpdate() {
        setOnEdit(true)
    }
    function handleCancel() {
        history.push("/Product")
    }
    function handleUpdate() {
        history.push("/Product")
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

    const handleChangeInput = e => {
        const {name, value} = e.target
        
        if(typingTimeoutRef.current)
            clearTimeout(typingTimeoutRef.current);
        
        setDetailProduct({...detailProduct, [name]:value})

        typingTimeoutRef.current = setTimeout(() => {
            
            console.log("Event target: ", value)
        }, 500)
    }

    const onFormSubmit = event => {
        event.preventDefault();

        try {
            if(!images) return alert("No Image Upload")

            const newProduct = {...detailProduct, images}
            console.log("NEWPRODUCT: ", newProduct)

            dispatch(editProduct(productId, newProduct));
            history.push("/Product");
        } catch (error) {
            alert(error.response.data.msg)
        }
        
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div>
            <HeaderMain />

            {!onEdit? 
                <div>
                    <h5>View the detail product</h5>
                    <button onClick={handleClickUpdate} className="btn btn-primary">Update product</button>
                    <div className="detail">
                        <img src={detailProduct.images.secure_url} alt="" />
                        <div className="box-detail">
                            <div className="row">
                                <h2>{detailProduct.title}</h2>
                                <h6>#id: {detailProduct.product_id}</h6>
                            </div>
                                <span>$ {detailProduct.price}</span>
                                <p>Description: {detailProduct.description}</p>
                                <p>Content: {detailProduct.content}</p>
                                <p>Sold: {detailProduct.sold}</p>
                        </div>
                    </div>
                    <button onClick={handleBack} className="btn btn-secondary">Back</button>
                </div>    
                :
                <div>
                    <h5>Edit the product</h5>

                    <div className="create_product">
                        {/* <div className="upload">
                            <img src={detailProduct.images.secure_url} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div> */}

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
                                <label>Product ID:</label> 
                                <input type='text' placeholder='product_id' name='product_id' 
                                onChange={handleChangeInput} value={detailProduct.product_id} disabled="true" />
                            </div>

                            <div className="row">
                                <label>Product name:</label> 
                                <input type='text' placeholder='title' name='title' 
                                onChange={handleChangeInput} value={detailProduct.title}/>
                            </div>  

                            <div className="row">
                                <label>Description:</label> 
                                <input type='text' placeholder='description' name='description' 
                                onChange={handleChangeInput} value={detailProduct.description}/>
                            </div> 

                            <div className="row">    
                                <label>Content:</label> 
                                <input type='text' placeholder='content' name='content' 
                                onChange={handleChangeInput} value={detailProduct.content}/>
                            </div>

                            <div className="row">    
                            <label>Category:</label> 
                                <select className="custom-select" name='category' onChange={handleChangeInput}>
                                    {category.map(n => (
                                        <option  value={n}>{n}</option>
                                    ))}
                                    
                                </select >
                            </div>

                            <div className="row">    
                                <label>Price:</label> 
                                <input type='text' placeholder='price' name='price' 
                                onChange={handleChangeInput} value={detailProduct.price}/>
                            </div>
                        
                            <button onClick={handleCancel} className="btn btn-danger">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div> 
            }
            <div>
                <h2>Related products</h2>
                <div className="products">
                    
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;