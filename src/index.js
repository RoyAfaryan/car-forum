import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreatePost from './pages/CreatePost';

import { Amplify } from 'aws-amplify';
import config from "./aws-exports";

Amplify.configure(config)

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />}></Route>
                <Route path="create-post" element={<CreatePost/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
