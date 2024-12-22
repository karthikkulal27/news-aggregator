// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 p-4">
                <Outlet /> {/* This will render the content based on the route */}
            </main>
        </div>
    );
};

export default MainLayout;
