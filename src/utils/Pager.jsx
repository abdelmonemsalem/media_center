import React from 'react'
import _ from 'lodash'
import Pagination from 'react-bootstrap/Pagination'

export default function Pager(props) {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize)
    if (pagesCount === 1) return null; 
    const pages = _.range(1, pagesCount + 1);
    console.log(currentPage + '///' + pages)
    return (
        <Pagination>
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 ? true : false } />
            {pages.map(page => ( <Pagination.Item key={page} onClick={() => onPageChange(page)} active={page === currentPage ? 'active' : ''}>{page}</Pagination.Item> ))}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pages.length ? true : false } />
        </Pagination>
    )
}
