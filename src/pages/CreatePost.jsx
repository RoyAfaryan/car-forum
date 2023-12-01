import './CreatePost.css';
import { Button, TextAreaField, TextField } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import * as mutations from "../graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
import { Link } from "react-router-dom";

const client = generateClient();

function CreatePost() {
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setPostContent] = useState('');
	const [posts, setPosts] = useState([]);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const currentAuthenticatedUser = async () => {
			try {
				const { userId } = await getCurrentUser();
				setUserId(userId);
			} catch (err) {
				console.log(err);
			}
		}

		currentAuthenticatedUser();

	}, []);

	const handleCreatePost = async () => {
		try {
			// Create a new post
			const newPost = await client.graphql({
				query: mutations.createPost,
				variables: { input: { title: postTitle, content: postContent, userID: userId } },
			});

			// Update the state to include the new post
			setPosts([...posts, newPost.data.createPost]);

			// Clear the text boxes
			setPostTitle('');
			setPostContent('');

		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error("Error creating post:", error);
		}
	};

	return (
		<div>
			<Link to="/">
				<div className="home-button">
					<Button>Home</Button>
				</div>
			</Link>

			<div className="create-post">
				<TextField
					placeholder="Title"
					label="Post Title"
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
				/>
				<TextAreaField
					label="Post Content"
					placeholder="Text"
					value={postContent}
					rows={6}
					onChange={(e) => setPostContent(e.target.value)}
				/>
				<Button onClick={handleCreatePost}>Create Post</Button>
			</div>
		</div>
	);
}

export default CreatePost;