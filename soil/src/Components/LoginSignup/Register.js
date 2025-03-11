import React, { useState } from 'react';
import { createUser_MID, findUser_MID,verifyUser_MID } from './validation'; 
import { useNavigate } from 'react-router-dom';
import './Register.css'
import validator from 'validator';

function Register(props) {
    const [fields, setFields] = useState({ name: "", dob: "", email: "", password: "" });
    const navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const temp = { ...fields, [name]: value };
        setFields(temp);
    }

    const isStrongPassword = (password) => {
        const req = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false, 
        };
        return validator.isStrongPassword(password,req);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!isStrongPassword(fields.password)) {
            setErrorMessage("Password does not meet the Requirment!!");
            return;
        }

        const userExists = await findUser_MID(fields.email); 
        if (userExists) {
            setErrorMessage("Email address already exists!");
            setSuccessMessage(null); 
            return;
        } else {
            // Add joinDate field to the newUser object
            const newUser = { ...fields};

            // const registered = await register(newUser);
            const registered = await createUser_MID(newUser);
            if (registered) {
                // Verify and log in the user after successful registration 
                // need to update this function to verify through middle layer
                const verified = await verifyUser_MID(fields.email, fields.password);
                if (verified) {
                    props.loginUser(verified);
                    setErrorMessage(null);
                    alert("User successfully registered!");
                    navigate("/");  // Navigate to the profile page
                    return;
                } else {
                    // If verification fails
                    setErrorMessage("Registration successful but login failed. Please log in manually.");
                    setSuccessMessage(null);
                }
            } else {
                setErrorMessage("Registration failed, please try again.");
                setSuccessMessage(null);
            }
        }
    }



    return (
        <div>
        <div className="registerBlock">
            <form onSubmit={handleSubmit}>
                <div className='reg1'>
                    <h1>Sign Up</h1>
                </div>
                <div className='lname'>
                    <label>Name</label>
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={fields.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='ldob'>
                    <label>Date of Birth</label>
                </div>
                <div className="input-box">
                    <input
                        type="date"
                        name="dob"
                        placeholder="D.O.B"
                        value={fields.dob}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='lemail'>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="example@domain.com"
                        value={fields.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="form-group">
                        <span className="text-danger">{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="form-group">
                        <span className="text-success">{successMessage}</span>
                    </div>
                )}
                <div className='lpassword'>
                    <label>Password</label>
                    
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="*********"
                        value={fields.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="password-requirements">
        Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
    </div>

                <div className='submit-btn'>
                    <input type="submit" className="btn btn-primary" value="Sign Up" />
                </div>
            </form>
            
        </div>
            <footer className="footer">
                <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
             </footer>
        </div>
    );
}

export default Register;
