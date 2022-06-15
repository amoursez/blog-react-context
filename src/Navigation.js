import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AddProductPage from './pages/AddPostPage';
import EditProductPage from './pages/EditPostPage';
import Navbar from './components/Navbar';
import ProductDetailsPage from './pages/PostDetailsPage';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route path="/details/:id" element={<ProductDetailsPage />} />
        <Route path="/add" element={<AddProductPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
