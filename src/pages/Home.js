import React from 'react';
import './styles/home.css'

const Home = ({post, handlePageChange}) => {
  return (
  <div key={post.id}>
    <div className="container">
        <div className="post-list">
            <div className="post" onClick={() => handlePageChange(post.id)}>
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
  </div>
  );
}

export default Home