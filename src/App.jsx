import { useState, useEffect } from 'react'
import Home from "./pages/Home"
import './App.css'
import { init } from 'authnest-frontend';

const NODE_ENV = 'development'

function App() {
  const [auth, setAuth] = useState(null);
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isLoading: true,
    hasSession: false,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔄 Starting auth initialization...');
        
        // Initialize AuthNest
        const authInstance = init({
          debug: NODE_ENV === 'development'
        });

        // Wait a bit for the instance to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!mounted) return;

        setAuth(authInstance);

        // Check if methods are available
        if (authInstance && typeof authInstance.getStatus === 'function') {
          const status = authInstance.getStatus();
          console.log('🔐 Initial auth status:', status);
          
          if (mounted) {
            setAuthStatus({
              isAuthenticated: status.isAuthenticated,
              isLoading: false,
              hasSession: status.hasSession,
              error: null
            });
          }

          // If there's a session but not authenticated, it means auto-fetch failed
          // We'll show the user an option to retry or login fresh
          if (status.hasSession && !status.isAuthenticated) {
            console.log('⚠️ Session exists but authentication failed');
          }
        } else {
          throw new Error('Auth methods not available');
        }

      } catch (error) {
        console.error('❌ Auth initialization failed:', error);
        if (mounted) {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            hasSession: false,
            error: 'Failed to initialize authentication'
          });
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Add this useEffect to your existing App.jsx
useEffect(() => {
  const handleLoginCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const sessionId = urlParams.get('session_id');

    if (token && sessionId && auth) {
      console.log('🔄 Login callback detected, handling token storage...');
      
      try {
        const result = await auth.handleLoginCallback(token, sessionId);
        
        if (result.success) {
          console.log('✅ Login callback handled successfully');
          // Update UI state
          setAuthStatus({
            isAuthenticated: true,
            isLoading: false,
            hasSession: false
          });
          
          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          console.error('❌ Login callback failed:', result.error);
        }
      } catch (error) {
        console.error('❌ Error handling login callback:', error);
      }
    }
  };

  handleLoginCallback();
}, [auth]);

  const handleLogin = async () => {
    if (!auth) return;

    try {
      setAuthStatus(prev => ({ ...prev, isLoading: true }));
      
      // Create a fresh session for login
      const authRequest = await auth.prepareAuthRequest('login');
      console.log('📝 Prepared auth request:', authRequest);
      
      // Get the session ID
      const sessionId = auth.getSessionId();
      console.log('🔑 Session ID for login:', sessionId);
      
      if (sessionId) {
        // Redirect to login with session ID
        console.log('🔗 Redirecting to login...');
        window.location.href = `/api/loginLink?session_id=${encodeURIComponent(sessionId)}`;
      } else {
        throw new Error('Failed to create session');
      }
    } catch (error) {
      console.error('❌ Login preparation failed:', error);
      setAuthStatus(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to start login process'
      }));
    }
  };

  const handleFreshLogin = () => {
    // Clear any existing session and start fresh
    if (auth) {
      auth.logout();
    }
    localStorage.removeItem('authnest_session');
    
    // Redirect to basic login without session
    window.location.href = '/api/loginLink';
  };

  const handleLogout = () => {
    if (auth) {
      auth.logout();
      setAuthStatus({
        isAuthenticated: false,
        isLoading: false,
        hasSession: false,
        error: null
      });
    }
  };

  const retryAuthCheck = async () => {
    if (!auth) return;
    
    setAuthStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Wait a bit and check status again
      await new Promise(resolve => setTimeout(resolve, 1000));
      const status = auth.getStatus();
      
      setAuthStatus({
        isAuthenticated: status.isAuthenticated,
        isLoading: false,
        hasSession: status.hasSession,
        error: null
      });
    } catch (error) {
      setAuthStatus(prev => ({
        ...prev,
        isLoading: false,
        error: 'Retry failed'
      }));
    }
  };

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

      <Home auth={auth}  />
    </>
  );
}

export default App;