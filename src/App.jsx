import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageContent from './layout/PageContent';
import Router from './Routes/Router';
import ScrollToTop from './components/ScrollToTop';
import { verifyToken } from './store/actions/authActions';

function App() {
  const dispatch = useDispatch();

  // Auto-login: Check for token in localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      dispatch(verifyToken(token));
    }
  }, [dispatch]);

  return (
    <PageContent>
      <ScrollToTop />
      <Router />
    </PageContent>
  );
}

export default App;