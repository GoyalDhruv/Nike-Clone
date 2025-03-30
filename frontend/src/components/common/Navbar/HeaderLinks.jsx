import React from 'react'
import { Link } from 'react-router-dom'

function HeaderLinks() {
    return (
        <>
            <Link to={{
                pathname: "/products",
                search: "?status=classics",
            }}>
                <li className='nav-list-items'>Classics</li>
            </Link>
            <Link to={{
                pathname: "/products",
                search: "?gender=men",
            }}>
                <li className='nav-list-items'>Men</li>
            </Link>
            <Link to={{
                pathname: "/products",
                search: "?gender=women",
            }}>
                <li className='nav-list-items'>Women</li>
            </Link>
            <Link to={{
                pathname: "/products",
                search: "?isKids=true",
            }}>
                <li className='nav-list-items'>Kids</li>
            </Link>
            <Link to={{
                pathname: "/products",
                search: "?status=discount",
            }}>
                <li className='nav-list-items'>Sale</li>
            </Link>
        </>
    )
}

export default HeaderLinks