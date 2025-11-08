import { useNavigation } from 'authnest-react';

const HomePage = ({ auth }) => {
  const { loadingStates, buttonConfigs, handleNavigation } = useNavigation(auth);

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