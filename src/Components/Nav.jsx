import React, { useEffect, useState } from 'react';
import {getTopics } from '../utils/api';
import "../Css/Nav.css"

const Nav = () => {
    const [topics, setTopics ] = useState([])

    useEffect( () => {
        getTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
    }, [])

    return (
        <nav className="nav">
            <ul>
                {topics.map((topic) => {
                    return <li key={topic.slug}> {topic.slug} </li>
                })}
            </ul>
        </nav>
    );
};

export default Nav;