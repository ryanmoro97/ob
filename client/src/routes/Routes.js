import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Products from './Products';
import BigCommerce from './BigCommerce';
import AIM from './AIM';
import BurgMenu from '../components/BurgMenu';

function AppRoutes() {
  return (
    <Router>
        <BurgMenu/>
        <Container>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/bigcommerce" element={<BigCommerce />} />
                <Route path="/aim" element={<AIM />} />
            </Routes>
        </Container>
    </Router>
  );
}

export default AppRoutes;
