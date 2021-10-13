import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
    handleProductSearch: PropTypes.func,
    handleProductSearchClear: PropTypes.func,
};

Search.defaultProps = {
    handleProductSearch: null,
    handleProductSearchClear: null
}

function Search(props) {
    const { handleProductSearch, handleProductSearchClear } = props;
    const [ searchTerm, setSearchTerm ] = useState('');
    const typingTimeoutRef = useRef(null) // Tamp variable keep it's value after every render 

    function handleSearchTermChange (event) {
        const value = event.target.value;

        if(typingTimeoutRef.current)
            clearTimeout(typingTimeoutRef.current);

        setSearchTerm(value)

        typingTimeoutRef.current = setTimeout(() => {
            
            console.log("Event target: ", value)
        }, 500)
    }

    function handleSubmit (event) {
        event.preventDefault();

        if(searchTerm !== '') {
            if(!handleProductSearch) return;
            
            const searchTermForm = {
                searchTerm
            }
            handleProductSearch(searchTermForm)
        }
        //setSearchTerm('')
    }

    function handleClear () {
        handleProductSearchClear();
        setSearchTerm('');
    }

    return (
        <div>
            <h6> Search </h6>

            <form onSubmit={handleSubmit}>
                <label className="col-lg-1 col-md-3 col-sm-6  text-right">Product name:</label> 
                <input type='text' placeholder='Product name' name='title' onChange={handleSearchTermChange} value={searchTerm}/>
                <label className="col-lg-1 col-md-3 col-sm-6  text-right">Category:</label> 
                <input type='text' placeholder='Select category'/>
                <label className="col-lg-1 col-md-3 col-sm-6  text-right">Sort price:</label> 
                <input type='text' placeholder='Sort price'/><br />
                <div className="text-center">
                    <input className="btn btn-primary" type='submit' value='Search' /><br/>
                </div>
            </form>  
            <div className="text-center">
                <button className="btn btn-warning" onClick={handleClear}>Clear search</button> <br />
            </div>
        </div>
        
    );
}

export default Search;