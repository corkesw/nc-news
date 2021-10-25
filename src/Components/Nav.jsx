import React, { useEffect, useState } from 'react';
import {getTopics } from '../utils/api';
import "../Css/Nav.css"
import { Link } from 'react-router-dom';

const Nav = ({}) => {
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
            <ul className="navlist" role='list'>
                <Link to="/" className="navlink">home</Link>
                {topics.map((topic) => {
                    return <Link to={`/articles/${topic.slug}`} className="navlink" key={topic.slug}><li role="listitem" className="navlink--item" > {topic.slug} </li></Link>
                })}
            </ul>
            {/* <span className="navspacer"></span> */}
        </nav>
    );
};

export default Nav;