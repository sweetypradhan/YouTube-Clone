import React, { useState, useEffect } from 'react';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ username: "", password: "" });
  const [submitData, setSubmitData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginField.username || !loginField.password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    console.log("Submitting login data:", loginField);

    setSubmitData({
      username: loginField.username,
      password: loginField.password,
    });
  };

  // Send POST request to login API
  useEffect(() => {
    const loginUser = async () => {
      if (submitData) {
        try {
          const response = await fetch('http://localhost:8000/api/users/login', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
          });

          const data = await response.json();
          console.log("Login response data:", data);

          if (response.ok) {

             // Save the JWT token in localStorage
             localStorage.setItem('jwt', data.token);

            localStorage.setItem('user', JSON.stringify(data.user)); // Save user data

            navigate('/home'); // Redirect to the home page after successful login
            setLoginModal(); // Close the modal
          } else {
            // Handle login failure
            setErrorMessage(data.message || "Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    };

    loginUser();
  }, [submitData, navigate, setLoginModal]);

  return (
    <div className='login'>
      <div className="login_card">
        <h2>Login</h2>
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <form className="login_form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={loginField.username} 
            onChange={(e) => handleOnChangeInput(e, "username")} 
            className="input_field" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginField.password} 
            onChange={(e) => handleOnChangeInput(e, "password")} 
            className="input_field" 
            required 
          />
          <button type="submit" className="login_button">Login</button>
        </form>
        <div className="button_group">
          <Link to="/signup" className="link_button" onClick={() => setLoginModal()}>Sign Up</Link>
          <button className="link_button" onClick={() => setLoginModal()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
