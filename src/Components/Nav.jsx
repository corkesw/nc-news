import React, { useEffect, useState } from 'react';
import {getTopics } from '../utils/api';
import "../Css/Nav.css"
import { Link } from 'react-router-dom';

const Nav = () => {
    const [topics, setTopics ] = useState([])
    
    useEffect( () => {
        getTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
        // catch block!
    }, [])

    return (
        <nav className="nav">
            <ul>
                {topics.map((topic) => {
                    return <li key={topic.slug}><Link to={`/articles/topic=${topic.slug}`}> {topic.slug} </Link></li>
                })}
            </ul>
        </nav>
    );
};

export default Nav;