import { useState } from 'react';

const RegistrationLink = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleRegistration = () => {
    setLoading(true);

    const registrationUrl = `/api/registrationLink`;

    window.location.href = registrationUrl;
  };


  const handleLogin = () => {
    setLoading1(true);

    const loginUrl = `/api/loginLink`;

    window.location.href = loginUrl;
  };


  const handleGetUserProfile = () => {
    setLoading1(true);

    const GetProfileUrl = `/api/userDataLink`;

    window.location.href = GetProfileUrl;
  };

    const handleGetClientProfile = () => {
    setLoading1(true);

    const GetProfileUrl = `/api/clientDataLink`;

    window.location.href = GetProfileUrl;
  };

  return (
    <div>

      <div style={{
        padding: '0.5rem',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Registration Portal</h1>
        <p>Click the button below to proceed with registration</p>

        <button
          onClick={handleRegistration}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading ? 'Redirecting...' : 'Start Registration'}
        </button>

        {loading && (
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Redirecting to registration portal...
          </p>
        )}
      </div>


      <div style={{
        padding: '0.5rem',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>

        <p>Click the button below to proceed with login</p>

        <button
          onClick={handleLogin}
          disabled={loading1}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading1 ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading1 ? 'Redirecting...' : 'Start Login'}
        </button>

        {loading1 && (
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Redirecting to login portal...
          </p>
        )}
      </div>


      <div style={{
        padding: '0.5rem',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>

        <p>Click to proceed with Getting User Profile Info.</p>

        <button
          onClick={handleGetUserProfile}
          disabled={loading1}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading1 ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading1 ? 'Redirecting...' : 'Start User Profile Link'}
        </button>

        {loading1 && (
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Redirecting to login portal...
          </p>
        )}
      </div>

      <div style={{
        padding: '0.5rem',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>

        <p>Click to proceed with Getting Client Profile Info.</p>

        <button
          onClick={handleGetClientProfile}
          disabled={loading1}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading1 ? 'not-allowed' : 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading1 ? 'Redirecting...' : 'Start Client Profile Link'}
        </button>

        {loading1 && (
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Redirecting to login portal...
          </p>
        )}
      </div>
    </div>

  );
};

export default RegistrationLink;