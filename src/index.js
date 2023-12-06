import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify } from 'aws-amplify';
import config from "./aws-exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";

Amplify.configure(config)

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<App/>}></Route>
                <Route path="create-post" element={<CreatePost/>}></Route>
                <Route path="view-post" element={<ViewPost/>}></Route>
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
