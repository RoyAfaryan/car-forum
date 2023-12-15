import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import { generateClient } from '@aws-amplify/api';
import * as queries from './graphql/queries.js';
import { getCurrentUser } from '@aws-amplify/auth';
import Home from './pages/Home.js';
import Nav from './pages/Nav.js';

const client = generateClient();

function App({ signOut }) {
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

		// Fetch existing posts when the component mounts
		const fetchPosts = async () => {
			const result = await client.graphql({ query: queries.listPosts });
			setPosts(result.data.listPosts.items.sort((a, b) => {
					const dateA = new Date(a.createdAt);
					const dateB = new Date(b.createdAt);
					return dateB - dateA;
				}
			));
		};

		fetchPosts();
	}, []);

	return (
		<div className="App">
			<Nav signOut={signOut}/>

			{posts.map(post => (<Home key={post.id} post={post}/>))}
		</div>
	);
}

export default withAuthenticator(App);

