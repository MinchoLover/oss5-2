import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import List from './components/List';
import Update from './components/Update';
import Create from './components/Create';
import "./index.css";

const Index = () => {
    return (
        <Routes>
            <Route path="/" element={<List />}/>
            <Route path="/list" element={<List />}/>
            <Route path="/update/:id" element={<Update />}/>
            <Route path="/create" element={<Create />}/>
        </Routes>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <Index/>
</BrowserRouter>);
