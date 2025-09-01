import { useState } from 'react';

const RegistrationLink = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleRegistration = () => {
    setLoading(true);

    // Your API endpoint with parameters


    const registrationUrl = `/api/registrationLink`;

    // console.log('Redirecting to:', registrationUrl);

    window.location.href = registrationUrl;
  };


  const handleLogin = () => {
    setLoading1(true);
    console.log("login click")

    // Your API endpoint with parameters


    const loginUrl = `/api/loginLink`;

    // console.log('Redirecting to:', registrationUrl);

    window.location.href = loginUrl;
  };

  return (
    <div>

      <div style={{
        padding: '2rem',
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
        padding: '2rem',
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
          {loading1? 'Redirecting...' : 'Start Login'}
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