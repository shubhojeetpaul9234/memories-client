import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails.jsx';
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Navigate to="/posts" />} />
                    <Route exact path="/posts" element={<Home/>} />
                    <Route exact path="/posts/search" element={<Home/>} />
                    <Route exact path="/posts/:id" element={<PostDetails/>} />
                    <Route path={"/creators/:name" || "/tags/:name"} element={<CreatorOrTag/>} />
                    <Route exact path="/auth" element={(!user ? <Auth/> : <Navigate to="/posts" />)} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;