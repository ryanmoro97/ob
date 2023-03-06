import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Products from './Products';
import SumElse from './SumElse';
import BurgMenu from '../components/BurgMenu';

function AppRoutes() {
  return (
    <Router>
        <BurgMenu/>
        <Container>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sumelse" element={<SumElse />} />
            </Routes>
        </Container>
    </Router>
  );
}

export default AppRoutes;
