import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/userslice'; // Import your action
import axios from 'axios';
import '../style/EditProfile.css';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            const response = await axios.get('http://localhost:8000/api/auth/profile/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            dispatch(setUser(response.data)); // Dispatch user data to Redux
        };

        fetchUserData();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            dispatch(setUser({ ...userData, image: files[0] }));
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            dispatch(setUser({ ...userData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        if (userData.image) {
            formData.append('profile_picture', userData.image);  // Make sure this is correct
        }
    
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.put('http://localhost:8000/api/auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.alert("Profile updated successfully!");
            dispatch(setUser(response.data));
            console.log(response.data);  // Log response to check if the upload was successful
        } catch (error) {
            console.error('Error uploading image:', error);
            window.alert("There was an error updating your profile.");
        }
    };
    const handleBack = () => {
        navigate('/home'); // Navigates to the homepage
    };
    
    return (
        
        <div className="container">
            <h1>Edit Profile</h1>
            <hr />
            <button className="back-btn" onClick={handleBack}>
                Back to Home
            </button>
            <div className="row">
                {/* Left column for image upload */}
                <div className="col-md-3">
                    <div className="text-center">
                    <img
                    src={imagePreview || (userData.profile_picture ? `http://localhost:8000${userData.profile_picture}` : "https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png")}
                    alt="profile"
                  />
                        <h6>Upload a different photo...</h6>
                        <input type="file" name="image" className="form-control" onChange={handleChange} />
                    </div>
                </div>

                {/* Edit form column */}
                <div className="col-md-9 personal-info">

                    <h3>Personal info</h3>
                    <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="col-md-3 control-label">Username:</label>
                            <div className="col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Email:</label>
                            <div className="col-lg-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-3 control-label"></label>
                            <div className="col-md-8">
                                <input type="submit" className="btn btn-primary" value="Save Changes" />
                                <span></span>
                                <input type="reset" className="btn btn-default" value="Cancel" />
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
            <hr />
        </div>
    );
};

export default EditProfile;
