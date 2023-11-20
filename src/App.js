import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Flex, Heading, Text, TextField, View, withAuthenticator, Image } from "@aws-amplify/ui-react";
import { generateClient } from '@aws-amplify/api';
import * as mutations from './graphql/mutations.js';

const client = generateClient();

function App({ signOut }) {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  

  const handleCreatePost = async () => {
    try {
      
      const postDetails = {
        id:'1',
        title: postTitle,
        content: postContent,
        image_url: "",
        created_at: "",
        userID: "",
        Comments:"",
        createdAt:"",
        updatedAt:"",
       __typename:""

        
      };

      const newPost = await client.graphql({
        query: mutations.createPost,
        variables: {input: postDetails}
      });


      // Update the state to include the new post
      setPosts(prevPosts => [...prevPosts, newPost.data.createPost]);

      // Clear the text boxes
      setPostTitle('');
      setPostContent('');

      // Log the new post to the console
      console.log("New post created:", newPost);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error creating post:", error);
    }
  };

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
        {/* Add other input fields as needed for additional post attributes */}
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