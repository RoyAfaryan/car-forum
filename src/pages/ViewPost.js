import React, { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/api';
import * as queries from '../graphql/queries.js';
import './styles/home.css'
import {useLocation} from "react-router-dom";
import Nav from "./Nav";

const client = generateClient();

const ViewPost = () => {
    const [post, setPost] = useState(null);

    let { state } = useLocation();

    const fetchPost = async () => {
        try {
            const result = await client.graphql({
                query: queries.getPost,
                variables: { id: state },
            });

            setPost(result.data.getPost);
        } catch (error) {
            console.error(error);
        }
    };

    fetchPost();

    return (
        <div>
            <Nav></Nav>

            {post ?
                <div key={post.id}>
                    <div className="container">
                        <div className="view-post">
                            <div className="post-content">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-details">Created at {post.createdAt}</p>
                                <p className="post-text">{post.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default ViewPost;