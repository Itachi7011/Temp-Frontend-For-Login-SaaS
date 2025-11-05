import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthComponent } from 'authnest-react';
import Home from "./pages/Home"
import ModalsTesting from "./pages/ModalsTesting"
import './App.css'

const NODE_ENV = 'development'

function App({ auth }) {
  // Optional: Add any app-specific state here
  const [appData, setAppData] = useState(null);

  // Optional: Handle auth events
  const handleAuthSuccess = (authInstance) => {
    console.log('✅ User authenticated successfully!', authInstance);
    // Do something with the auth instance if needed
  };

  const handleAuthFailure = (error) => {
    console.error('❌ Authentication failed:', error);
    // Handle auth failure
  };

  return (
    <>
      <AuthComponent
        options={{ debug: NODE_ENV === 'development' }}
        onAuthSuccess={handleAuthSuccess}
        onAuthFailure={handleAuthFailure}
         requireAuth={true} 
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/ModalsTesting" element={<ModalsTesting />} />
          </Routes>
        </Router>
      </AuthComponent>
    </>
  );
}

export default App;