import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import ModalsTesting from "./pages/ModalsTesting"
import './App.css'
import { useAuth } from 'authnest-react';

const NODE_ENV = 'development'

function App() {
  const {
    auth,
    authStatus,
    handleLogin,
    handleFreshLogin,
    handleLogout,
    retryAuthCheck
  } = useAuth({
    debug: NODE_ENV === 'development'
  });

  // Login callback handling is now automatically handled inside useAuth hook

  if (authStatus.isLoading) {
    return (
      <div className="App">
        <h1>My App</h1>
        <div>Loading authentication...</div>
      </div>
    );
  }

  return (
    <>
      <div className="App">
        <h1>My App</h1>

        {authStatus.error && (
          <div style={{ color: 'red', margin: '10px 0' }}>
            Error: {authStatus.error}
          </div>
        )}

        {authStatus.isAuthenticated ? (
          <div>
            <h2>Welcome! You are authenticated</h2>
            <p>Token is securely stored in cookies</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Authentication Required</h2>

            {authStatus.hasSession ? (
              <div>
                <p>We found an existing session, but couldn't authenticate automatically.</p>
                <div style={{ margin: '10px 0' }}>
                  <button onClick={handleLogin} style={{ marginRight: '10px' }}>
                    Continue with Existing Session
                  </button>
                  <button onClick={handleFreshLogin} style={{ marginRight: '10px' }}>
                    Start Fresh Login
                  </button>
                  <button onClick={retryAuthCheck}>
                    Retry Check
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Session ID: {auth?.getSessionId?.()}
                </div>
              </div>
            ) : (
              <div>
                <p>No active session found.</p>
                <button onClick={handleLogin}>
                  Login with AuthNest
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />
          <Route path="/ModalsTesting" element={<ModalsTesting />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;