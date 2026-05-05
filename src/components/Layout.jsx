import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';

const Layout = ({ children }) => {
    return (
        <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {/* <FloatingContact /> */}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
