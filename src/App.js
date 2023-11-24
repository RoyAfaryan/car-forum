import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Heading, Text, TextField, withAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from '@aws-amplify/api';
import * as queries from './graphql/queries.js';
import * as mutations from './graphql/mutations.js';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

function App({ signOut }) {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

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

      {/* Form for creating a new post */}
      <div>
        <TextField
          label="Post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <TextField
          label="Post Content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <Button onClick={handleCreatePost}>Create Post</Button>
      </div>

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
