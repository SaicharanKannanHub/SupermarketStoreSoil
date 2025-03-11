import React from 'react';
import { getProfile_MID,updateProfile_MID,deleteProfile_MID  } from '../LoginSignup/validation';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';


// import { getProfile,updateProfile,deleteProfile } from '../../Data/repository';

function Profile(props) {

  // const [values, setValues] = useState(getCurrentUserInfo);
  const [values, setValues] = useState({}); // Initialized values as an empty object
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile(){
      //testing
      // console.log(props.user.email);
      const userInfo = await getProfile_MID(props.user.email);
      setValues(userInfo);
      

    }
    loadProfile();
  }, []);


  const handleInputChange = (e) => {
    const {name,value} = e.target
    setUpdate((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateProfile_MID(props.user.email,update);
    if (success) {
      alert('Profile updated successfully!');
      setEditMode(false);
      setValues((prevValues) => ({ ...prevValues, ...update }));
    } else {
      alert('Failed to update profile.');
    }
  };

  const handleDelete = async (e) => {
    const confirmDelete = window.confirm("Are you sure you want to delelte this user? ");
    if (confirmDelete){
      const del = await deleteProfile_MID(props.user.email)
      alert('User Deleted Successfully!!');
      navigate("/login");
    }
  }
  if (!values || Object.keys(values).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="profile">
        <h1>User Profile</h1>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={values.name || ''} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={values.email || ''} onChange={handleInputChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="dob" value={values.dob || ''} onChange={handleInputChange} />
            </label>
            <button className="profile-button" type="submit">Save Changes</button>
            <button className="profile-button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {values.name || 'N/A'}</p>
            <p><strong>Email:</strong> {values.email || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {values.dob || 'N/A'}</p>
            <p><strong>Join Date:</strong> {values.join_date || 'N/A'}</p>
            <button className="profile-button" onClick={() => setEditMode(true)}>Edit Profile</button>
            <button className="profile-button" onClick={handleDelete}>Delete Account</button>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;
