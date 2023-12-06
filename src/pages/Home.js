import React from 'react';
import './styles/home.css'
import {Link} from "react-router-dom";

const Home = ({ post }) => {
    return (

			<div key={post.id}>
				<div className="container">
					<div className="post-list">
						<Link to="view-post" state={ post.id }>
							<div className="post">
								<div className="thumbnail-container">
									<img className="thumbnail" src={post.image_url} alt="Post Thumbnail"/>
								</div>
								<div className="post-content">
									<h2 className="post-title">{post.title}</h2>
									<p className="post-details">Created at {post.created_at}</p>
									<p className="post-text">{post.content}</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>

    );
}

export default Home