import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Heading, Text, withAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from '@aws-amplify/api';
import * as queries from './graphql/queries.js';
import { getCurrentUser } from '@aws-amplify/auth';
import { Link } from "react-router-dom";

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
      setPosts(result.data.listPosts.items);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>

        <Link to="create-post">
        	<Button>Create Post</Button>
        </Link>

      {/* Display created posts */}
      <div>
        <Heading>Created Posts</Heading>
        {posts.map(post => (
          <div key={post.id}>
            <Heading>{post.title}</Heading>
            <Text>{post.content}</Text>
          </div>
        ))}
      </div>

      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(App);
