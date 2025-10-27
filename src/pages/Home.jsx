import { useState, useEffect } from 'react';

const HomePage = ({ auth }) => {
  const [loadingStates, setLoadingStates] = useState({
    registration: false,
    login: false,
    userProfile: false,
    clientProfile: false,
    emailVerification: false,
    generalSettings: false,
    securitySettings: false,
    notificationsSettings: false,
    getUserData: false
  });

  const handleGetUserData = async () => {
    if (!auth) {
        console.error('Auth not initialized');
        alert('Authentication not ready. Please try again.');
        return;
    }

    try {
        setLoadingStates(prev => ({ ...prev, getUserData: true }));
        
        const sessionId = auth.getSessionId();
        
        if (!sessionId) {
            alert('No active session. Please login first.');
            return;
        }

        console.log('🔐 Getting user data with session:', sessionId);
        window.location.href = `/api/getUserData?session_id=${encodeURIComponent(sessionId)}`;
        
    } catch (error) {
        console.error('Failed to get user data:', error);
        alert('Failed to fetch user data. Please try again.');
    } finally {
        setLoadingStates(prev => ({ ...prev, getUserData: false }));
    }
  };

  const handleNavigationWithSession = async (key, baseUrl) => {
    if (!auth) {
        console.error('Auth not initialized');
        alert('Authentication not ready. Please try again.');
        return;
    }

    try {
        setLoadingStates(prev => ({ ...prev, [key]: true }));
        
        // Ensure we have a session ID
        let sessionId = auth.getSessionId();
        
        if (!sessionId) {
            console.log('🔄 No session found, creating new one...');
            // Create a new session if none exists
            await auth.prepareAuthRequest('navigation');
            sessionId = auth.getSessionId();
        }

        if (!sessionId) {
            alert('Failed to create session. Please try again.');
            return;
        }

        console.log(`🔗 Navigating to ${baseUrl} with session:`, sessionId);
        
        // Construct URL with session ID
        const separator = baseUrl.includes('?') ? '&' : '?';
        const url = `${baseUrl}${separator}session_id=${encodeURIComponent(sessionId)}`;
        
        window.location.href = url;
        
    } catch (error) {
        console.error(`Navigation failed for ${key}:`, error);
        alert(`Failed to navigate to ${key}. Please try again.`);
        setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleRegistration = async () => {
    await handleNavigationWithSession('registration', '/api/registrationLink');
  };

  const handleLogin = async () => {
    await handleNavigationWithSession('login', '/api/loginLink');
  };

  const handleUserProfile = async () => {
    await handleNavigationWithSession('userProfile', '/api/userDataLink');
  };

  const handleClientProfile = async () => {
    await handleNavigationWithSession('clientProfile', '/api/clientDataLink');
  };

  const handleEmailVerification = async () => {
    await handleNavigationWithSession('emailVerification', '/api/emailVerificationLink');
  };

  const handleGeneralSettings = async () => {
    await handleNavigationWithSession('generalSettings', '/api/generalSettingsLink');
  };

  const handleSecuritySettings = async () => {
    await handleNavigationWithSession('securitySettings', '/api/securitySettingsLink');
  };

  const handleNotificationsSettings = async () => {
    await handleNavigationWithSession('notificationsSettings', '/api/notificationsSettingsLink');
  };

  const buttonConfigs = [
    {
      key: 'registration',
      title: 'Start Registration',
      description: 'Click the button below to proceed with registration',
      url: '/api/registrationLink',
      loadingText: 'Redirecting to registration portal...',
      customHandler: handleRegistration
    },
    {
      key: 'login',
      title: 'Start Login',
      description: 'Click the button below to proceed with login',
      url: '/api/loginLink',
      loadingText: 'Redirecting to login portal...',
      customHandler: handleLogin
    },
    {
      key: 'getUserData',
      title: 'Get User Data',
      description: 'Click to fetch user data using session ID',
      url: '/api/getUserData',
      loadingText: 'Fetching user data...',
      customHandler: handleGetUserData
    },
    {
      key: 'userProfile',
      title: 'User Profile',
      description: 'Click to proceed with Getting User Profile Info',
      url: '/api/userDataLink',
      loadingText: 'Redirecting to user profile...',
      customHandler: handleUserProfile
    },
    {
      key: 'clientProfile',
      title: 'Client Profile',
      description: 'Click to proceed with Getting Client Profile Info',
      url: '/api/clientDataLink',
      loadingText: 'Redirecting to client profile...',
      customHandler: handleClientProfile
    },
    {
      key: 'emailVerification',
      title: 'Email Verification',
      description: 'Click to proceed with Email Verification Link',
      url: '/api/emailVerificationLink',
      loadingText: 'Redirecting to email verification...',
      customHandler: handleEmailVerification
    },
    {
      key: 'generalSettings',
      title: 'General Settings',
      description: 'Click to access General Settings',
      url: '/api/generalSettingsLink',
      loadingText: 'Redirecting to general settings...',
      customHandler: handleGeneralSettings
    },
    {
      key: 'securitySettings',
      title: 'Security Settings',
      description: 'Click to access Security Settings',
      url: '/api/securitySettingsLink',
      loadingText: 'Redirecting to security settings...',
      customHandler: handleSecuritySettings
    },
    {
      key: 'notificationsSettings',
      title: 'Notifications Settings',
      description: 'Click to access Notifications Settings',
      url: '/api/notificationsSettingsLink',
      loadingText: 'Redirecting to notifications settings...',
      customHandler: handleNotificationsSettings
    }
  ];

  const handleNavigation = async (key, url, customHandler) => {
    if (customHandler) {
      await customHandler();
      return;
    }

    // Fallback for any buttons without custom handlers
    await handleNavigationWithSession(key, url);
  };

  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1 className="portal-title">Account Portal</h1>
        <p className="portal-subtitle">Manage your account settings and preferences</p>
        {auth && (
          <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            Session ID: {auth.getSessionId() || 'No active session'}
          </div>
        )}
      </div>

      <div className="buttons-grid">
        {buttonConfigs.map((config) => (
          <div key={config.key} className="button-card">
            <div className="card-content">
              <h3 className="card-title">{config.title}</h3>
              <p className="card-description">{config.description}</p>

              <button
                onClick={() => handleNavigation(config.key, config.url, config.customHandler)}
                disabled={loadingStates[config.key]}
                className={`action-button ${loadingStates[config.key] ? 'loading' : ''}`}
              >
                {loadingStates[config.key] ? (
                  <>
                    <span className="spinner"></span>
                    {config.loadingText || 'Loading...'}
                  </>
                ) : (
                  config.title
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;