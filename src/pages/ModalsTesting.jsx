import { useModalTesting } from 'authnest-react';

const ModalsTesting = () => {
  const {
    isLoading,
    message,
    authStatus,
    modalsAvailable,
    test2FAModal,
    testPasswordModal,
    testEmailModal,
    reloadPage,
    debugInfo
  } = useModalTesting();

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