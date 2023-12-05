import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Heading, Text, TextField, withAuthenticator} from "@aws-amplify/ui-react";
import { generateClient } from '@aws-amplify/api';
import * as queries from './graphql/queries.js';
import * as mutations from './graphql/mutations.js';
import { getCurrentUser } from '@aws-amplify/auth';
import Home from './pages/Home.js';
import Nav from './pages/Nav.js';
import NewPost from './pages/NewPost.js';
import ViewPost from './pages/ViewPost.js';

const client = generateClient();

function App({ signOut }) {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectPostID] = useState(null);


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

  const handlePageChange = async (page, postID = null) => {
    setCurrentPage(page);
    if (postID) {
      setSelectPostID(postID);
    }
  };

  return (
    <div className="App"> 
      <Nav signOut={signOut} handlePageChange={handlePageChange}/>

      {currentPage === 'home' && (posts.map(post => (<Home key={post.id} post={post} handlePageChange={handlePageChange}/>)))}

      {currentPage === 'new_post' && (<NewPost/>)}

      {currentPage === 'view_post' && (<ViewPost postID={selectedPostId} />)}
    </div>
  );
}

export default withAuthenticator(App);

