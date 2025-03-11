// Login.js
import React, { useState } from 'react';
import './Login.css';
import { verifyUser_MID } from './validation';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    // const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const verified = verifyUser(fields.email, fields.password);
        const verified = await verifyUser_MID(fields.email, fields.password);

        if (verified) {
            console.log(verified)
            props.loginUser(verified);
            alert("Login successful!!")
            navigate("/");
        }else{
            setErrorMessage("Incorrect credentials. Please try again");
            return;

        }
    }
    return (
        <div>
        <div className="wrapper">
        <form onSubmit={handleSubmit}>
            <h1 className="login-heading">Login</h1> 
            <div className="input-box">
                <input type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={fields.email}
                    onChange={handleInputChange}
                    required />
            </div>
            <div className="input-box">
                <input type="password"
                    name="password"
                    placeholder="*********"
                    value={fields.password}
                    onChange={handleInputChange}
                    required />
            </div>
            <div className="forgot-password">
                <a href="#">Forgot password?</a>
            </div>
            {errorMessage && (
                    <div className="form-group">
                        <span className="text-danger">{errorMessage}</span>
                    </div>
                )}
            <div className='submit-btn'>
                <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            <div className="register-link">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>

        </form>
    </div>
    <footer className="footer">
        <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
    </footer>
</div>
    
    )
}

export default Login;
