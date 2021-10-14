import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

PaginationPage.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

PaginationPage.defaultProps = {
    onPageChange: null
}

function PaginationPage(props) {
    const { pagination, onPageChange } = props;
    const {page, limit, totalRows} = pagination;

    const totalPages = Math.ceil(totalRows / limit);

    function handlePageChange (newPage) {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }

    // const paginationItems = useMemo(() => {
    //     const pages = [];

    //     for (let i = 1; i <= totalPages; i++) {
    //         pages.push(
    //             <Pagination.Item
    //                 key={i}
    //                 active={i === page}
    //                 onClick={() => handlePageChange(i)}
    //             >
    //                 {i}
    //             </Pagination.Item>
    //         );
    //     }
    //     return pages;
    // },[totalPages, page])

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
       <Pagination>
           <Pagination.Prev 
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
           />

            <Pagination>
                {pages}   
            </Pagination>

           <Pagination.Next 
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
            />
       </Pagination>
    );
}

export default PaginationPage;