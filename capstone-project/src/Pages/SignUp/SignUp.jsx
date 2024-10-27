import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import '../SignUp/Signup.css';

const Signup = () => {
  const [uploadedImgUrl, setUploadedImgUrl] = useState("https://i.ytimg.com/vi/T0CyWqPYQvw/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCk9Jg7ULtPdVxvsd1_AGkjURUwLw");
  const [signUpField, setSignUpField] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: uploadedImgUrl,
  });

  const [submitData, setSubmitData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch hook with enhanced error handling
  const { data, loading, error } = useFetch('http://localhost:8000/api/users/signup', 'POST', submitData);

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  // Upload profile image
  const uploadImg = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dndxcgcpt/image/upload", {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      setUploadedImgUrl(result.url);

      setSignUpField({
        ...signUpField,
        profilePic: result.url,
      });
    } catch (err) {
      console.log("Image upload error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!signUpField.username || !signUpField.email || !signUpField.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    console.log("Submitting signup data:", signUpField);

    setSubmitData({
      username: signUpField.username,
      email: signUpField.email,
      password: signUpField.password,
      profilePic: signUpField.profilePic,
    });
  };

  useEffect(() => {
    if (data) {
      if (data.token) {
        navigate('/');
        setErrorMessage("");
      }
    }

    if (error) {
      console.log("Signup error:", error);
      setErrorMessage("Signup failed. Please try again.");
    }
  }, [data, error, navigate]);

  return (
    <div className='signup'>
      <div className="signup_card">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        <form className="signup_form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={signUpField.username} onChange={(e) => handleInputField(e, "username")} className="input_field" required />
          <input type="email" placeholder="Email" value={signUpField.email} onChange={(e) => handleInputField(e, "email")} className="input_field" required />
          <input type="password" placeholder="Password" value={signUpField.password} onChange={(e) => handleInputField(e, "password")} className="input_field" required />

          <div className="image_upload_Signup">
            <input type='file' onChange={(e) => uploadImg(e)} />
            <div className="image_upload_Signup_div">
              <img className='signup_img' src={uploadedImgUrl} alt="Uploaded" />
            </div>
          </div>
          <button type="submit" className="signup_button" disabled={loading}>Sign Up</button>
          {loading && <p>Signing up...</p>}
        </form>
        <Link to={'/'} className="button_group">
          <button className="link_button">Home page</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
