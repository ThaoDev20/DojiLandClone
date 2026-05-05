import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ModalProvider } from './context/ModalContext';
import Layout from './components/Layout';
import RegistrationModal from './components/RegistrationModal';
import Home from './pages/Home';

// Lazy load secondary pages for better performance
const ProvincePage = lazy(() => import('./pages/ProvincePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ProjectListPage = lazy(() => import('./pages/ProjectListPage'));
const ConditionsPage = lazy(() => import('./pages/ConditionsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const Introduce = lazy(() => import('./pages/Introduce'));
const BOD = lazy(() => import('./pages/BOD'));
const ResortRealEstatePage = lazy(() => import('./pages/ResortRealEstatePage'));
const UrbanAreaPage = lazy(() => import('./pages/UrbanAreaPage'));
const ResidentialRealEstatePage = lazy(() => import('./pages/ResidentialRealEstatePage'));
const OfficeRealEstatePage = lazy(() => import('./pages/OfficeRealEstatePage'));
const RecruitmentPage = lazy(() => import('./pages/RecruitmentPage'));


// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    <div>Đang tải...</div>
  </div>
);

function App() {
  // Fix double URL issue with hash (e.g. /path#/path)
  React.useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const hashPath = window.location.hash.substring(1); // remove #
      // If hash path looks like the current pathname (ignoring query params)
      if (hashPath === window.location.pathname || hashPath.startsWith(window.location.pathname)) {
        console.log('Sanitizing URL: Removing redundant hash');
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  return (
    <DataProvider>
      <ModalProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              {/* <Route path="/tinh/:slug" element={<Layout><ProvincePage /></Layout>} /> */}
              {/* <Route path="/du-an/:slug" element={<Layout><ProjectDetailPage /></Layout>} /> */}
              <Route path="/lien-he" element={<Layout><ContactPage /></Layout>} />
              <Route path="/tin-du-an" element={<Layout><NewsPage /></Layout>} />
              <Route path="/ban-lanh-dao" element={<Layout><BOD /></Layout>} />
              <Route path="/gioi-thieu" element={<Layout><Introduce /></Layout>} />
              <Route path="/tuyen-dung" element={<Layout><RecruitmentPage /></Layout>} />
              <Route path="/tin-tuc/:id" element={<Layout><NewsDetailPage /></Layout>} />
              <Route path="/bat-dong-san-nha-o" element={<Layout><ResidentialRealEstatePage /></Layout>} />
              <Route path="/bat-dong-san-van-phong" element={<Layout><OfficeRealEstatePage /></Layout>} />
              <Route path="/bat-dong-san-nghi-duong" element={<Layout><ResortRealEstatePage /></Layout>} />
              <Route path="/khu-do-thi" element={<Layout><UrbanAreaPage /></Layout>} />

            </Routes>
          </Suspense>
          {/* <RegistrationModal /> */}
        </Router>
      </ModalProvider>
    </DataProvider>
  );
}

export default App;
