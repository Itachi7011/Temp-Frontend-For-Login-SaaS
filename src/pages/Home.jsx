import { useNavigation } from 'authnest-react';

const HomePage = () => {
  const { loadingStates, handleNavigation, handleGetUserData } = useNavigation();

  const buttonConfigs = [
    {
      key: 'registration',
      title: 'Start Registration',
      description: 'Click the button below to proceed with registration',
      loadingText: 'Redirecting to registration portal...',
      handler: () => handleNavigation('registration', '/api/registrationLink')
    },
    {
      key: 'login',
      title: 'Start Login',
      description: 'Click the button below to proceed with login',
      loadingText: 'Redirecting to login portal...',
      handler: () => handleNavigation('login', '/api/loginLink')
    },
    {
      key: 'getUserData',
      title: 'Get Users List',
      description: 'Click to fetch user data using session ID',
      loadingText: 'Fetching user data...',
      handler: handleGetUserData
    },
    {
      key: 'userProfile',
      title: 'User Profile',
      description: 'Click to proceed with Getting User Profile Info',
      loadingText: 'Redirecting to user profile...',
      handler: () => handleNavigation('userProfile', '/api/userDataLink')
    },
    {
      key: 'clientProfile',
      title: 'Client Profile',
      description: 'Click to proceed with Getting Client Profile Info',
      loadingText: 'Redirecting to client profile...',
      handler: () => handleNavigation('clientProfile', '/api/clientDataLink')
    },
    {
      key: 'emailVerification',
      title: 'Email Verification',
      description: 'Click to proceed with Email Verification Link',
      loadingText: 'Redirecting to email verification...',
      handler: () => handleNavigation('emailVerification', '/api/emailVerificationLink')
    },
    {
      key: 'generalSettings',
      title: 'General Settings',
      description: 'Click to access General Settings',
      loadingText: 'Redirecting to general settings...',
      handler: () => handleNavigation('generalSettings', '/api/generalSettingsLink')
    },
    {
      key: 'securitySettings',
      title: 'Security Settings',
      description: 'Click to access Security Settings',
      loadingText: 'Redirecting to security settings...',
      handler: () => handleNavigation('securitySettings', '/api/securitySettingsLink')
    },
    {
      key: 'notificationsSettings',
      title: 'Notifications Settings',
      description: 'Click to access Notifications Settings',
      loadingText: 'Redirecting to notifications settings...',
      handler: () => handleNavigation('notificationsSettings', '/api/notificationsSettingsLink')
    }
  ];

  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1 className="portal-title">Account Portal</h1>
        <p className="portal-subtitle">Manage your account settings and preferences</p>
      </div>

      <div className="buttons-grid">
        {buttonConfigs.map((config) => (
          <div key={config.key} className="button-card">
            <div className="card-content">
              <h3 className="card-title">{config.title}</h3>
              <p className="card-description">{config.description}</p>

              <button
                onClick={config.handler}
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