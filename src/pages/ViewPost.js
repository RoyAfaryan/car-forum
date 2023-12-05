import React, { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/api';
import * as queries from '../graphql/queries.js';
import './styles/home.css'

const client = generateClient();

const ViewPost = ({ postID }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await client.graphql({
          query: queries.getPost,
          variables: { id: postID },
        });

        setPost(result.data.getPost);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postID]);

  return (
  <div key={post.id}>
    <div className="container">
         <div className="view-post">
               <div className="thumbnail-container">
                  <img className="thumbnail" src={post.image_url} alt="Post Thumbnail"/>
               </div>
               <div className="post-content">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-details">Created at {post.created_at}</p>
                  <p className="post-text">{post.content}</p>
               </div>
        </div>
    </div>
  </div>
  );
}

export default ViewPost