import React, { useEffect, useState } from 'react';
import {getTopics } from '../utils/api';

const Nav = () => {
    const [topics, setTopics ] = useState([])

    useEffect( () => {
        getTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
    }, [])

    return (
        <section className="nav">
            <ul>
                {topics.map((topic) => {
                    return <li key={topic.slug}>{topic.slug}</li>
                })}
            </ul>
        </section>
    );
};

export default Nav;