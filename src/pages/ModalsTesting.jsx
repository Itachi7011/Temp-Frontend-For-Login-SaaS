// pages/ModalsTesting.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalsTesting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isLoading: true,
    hasSession: false
  });
  const [modalsAvailable, setModalsAvailable] = useState(false);
  const navigate = useNavigate();

  // Check if npm package modals are available
  useEffect(() => {
    const checkModalsAvailability = () => {
      const hasModals = !!(window.authnestModals && typeof window.authnestModals.show2FAModal === 'function');
      setModalsAvailable(hasModals);
      
      if (hasModals) {
        console.log('✅ AuthNestModals from npm package is available');
      } else {
        console.log('❌ AuthNestModals not available. Checking what exists:');
        console.log('- window.authnestModals:', window.authnestModals);
        console.log('- window.AuthNestModals:', window.AuthNestModals);
        console.log('- window.authnest:', window.authnest);
      }
    };

    // Check immediately
    checkModalsAvailability();

    // Check again after a short delay (in case package loads later)
    const timeoutId = setTimeout(checkModalsAvailability, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Check auth status
  useEffect(() => {
    const checkAuthStatus = () => {
      if (window.authnest) {
        const status = window.authnest.getStatus();
        setAuthStatus({
          isAuthenticated: status.isAuthenticated,
          isLoading: false,
          hasSession: status.hasSession
        });
      } else {
        setAuthStatus({
          isAuthenticated: false,
          isLoading: false,
          hasSession: false
        });
      }
    };

    checkAuthStatus();
    
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('authnest:authSuccess', handleAuthChange);
    window.addEventListener('authnest:authFailure', handleAuthChange);

    return () => {
      window.removeEventListener('authnest:authSuccess', handleAuthChange);
      window.removeEventListener('authnest:authFailure', handleAuthChange);
    };
  }, []);

  const test2FAModal = async () => {
    if (!window.authnestModals) {
      setMessage('❌ AuthNest modals not loaded from npm package.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await window.authnestModals.show2FAModal({
        title: 'Two-Factor Authentication',
        userContext: {
          reason: 'Security verification'
        }
      });
      
      setMessage(`✅ 2FA Successful!`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testPasswordModal = async () => {
    if (!window.authnestModals) {
      setMessage('❌ AuthNest modals not loaded from npm package.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await window.authnestModals.showPasswordConfirmModal({
        title: 'Confirm Your Password',
        userContext: {
          action: 'sensitive_operation'
        }
      });
      
      setMessage(`✅ Password Confirmation Successful!`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailModal = async () => {
    if (!window.authnestModals) {
      setMessage('❌ AuthNest modals not loaded from npm package.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await window.authnestModals.showEmailVerificationModal({
        title: 'Email Verification Required'
      });
      
      setMessage(`✅ Email Verification Successful!`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const debugInfo = () => {
    console.log('🔍 Debug Info:', {
      authnest: window.authnest,
      authnestModals: window.authnestModals,
      AuthNestModalsClass: window.AuthNestModals,
      modalsAvailable: modalsAvailable,
      authStatus: authStatus
    });
    setMessage('✅ Debug info logged to console');
  };

  if (authStatus.isLoading) {
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>AuthNest Modals Testing</h1>
        <div>Checking authentication status...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>AuthNest Modals Testing</h1>
      
      {/* Auth Status */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: authStatus.isAuthenticated ? '#d4edda' : '#f8d7da',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Authentication Status</h3>
        <p>
          {authStatus.isAuthenticated ? (
            <>✅ <strong>Authenticated</strong> | Token stored in cookies</>
          ) : (
            <>❌ <strong>Not Authenticated</strong></>
          )}
        </p>
      </div>

      {/* Package Status */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: modalsAvailable ? '#d4edda' : '#fff3cd',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3>NPM Package Status</h3>
        <p>
          {modalsAvailable ? (
            <>✅ <strong>AuthNestModals Loaded</strong> - Ready for testing</>
          ) : (
            <>⚠️ <strong>AuthNestModals Not Loaded</strong> - Check console for details</>
          )}
        </p>
        
        {!modalsAvailable && (
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={reloadPage}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Reload Page
            </button>
            <button 
              onClick={debugInfo}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Debug Info
            </button>
          </div>
        )}
      </div>

      {/* Modal Test Buttons */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Test Authentication Modals</h3>
        <p style={{ color: '#666' }}>
          Each modal will first verify your user token from cookies, then show the specific authentication modal.
        </p>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <button 
            onClick={test2FAModal}
            disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
            style={{
              padding: '12px 24px',
              backgroundColor: (authStatus.isAuthenticated && modalsAvailable) ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: (authStatus.isAuthenticated && modalsAvailable) ? 'pointer' : 'not-allowed'
            }}
          >
            Test 2FA Modal
          </button>
          
          <button 
            onClick={testPasswordModal}
            disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
            style={{
              padding: '12px 24px',
              backgroundColor: (authStatus.isAuthenticated && modalsAvailable) ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: (authStatus.isAuthenticated && modalsAvailable) ? 'pointer' : 'not-allowed'
            }}
          >
            Test Password Modal
          </button>
          
          <button 
            onClick={testEmailModal}
            disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
            style={{
              padding: '12px 24px',
              backgroundColor: (authStatus.isAuthenticated && modalsAvailable) ? '#ffc107' : '#6c757d',
              color: 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: (authStatus.isAuthenticated && modalsAvailable) ? 'pointer' : 'not-allowed'
            }}
          >
            Test Email Modal
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div style={{ 
          padding: '15px',
          backgroundColor: message.includes('❌') ? '#f8d7da' : '#d4edda',
          border: '1px solid',
          borderColor: message.includes('❌') ? '#f5c6cb' : '#c3e6cb',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          {message}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#007bff'
        }}>
          ⏳ Loading modal and verifying authentication...
        </div>
      )}
    </div>
  );
};

export default ModalsTesting;