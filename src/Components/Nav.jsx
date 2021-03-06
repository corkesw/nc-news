import React, { useEffect, useState } from 'react';
import {getTopics } from '../utils/api';
import "../Css/Nav.css"
import { Link } from 'react-router-dom';

const Nav = () => {
    const [topics, setTopics ] = useState([])
    const [err, setErr] = useState(null)

    useEffect( () => {
        getTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
        .catch(error => setErr('Connection error!'))
    }, [])

    return (
        <nav className="navlist__container">
            {err? <p>{err}</p>: null}
            <ul className="navlist">
                <Link to="/" className="navlink">home</Link>
                {topics.map((topic) => {
                    return <li className="navlink--item" key={topic.slug}><Link to={`/articles/${topic.slug}`} className="navlink"> {topic.slug} </Link></li>
                })}
            </ul>
            {/* <span className="navspacer"></span> */}
        </nav>
    );
};

export default Nav;