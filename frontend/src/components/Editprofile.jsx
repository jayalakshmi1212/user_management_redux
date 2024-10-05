// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser } from '../store/userslice'; // Import your action
// import axios from 'axios';
// import '../style/EditProfile.css';
// import { useNavigate } from 'react-router-dom';


// const EditProfile = () => {
//     const userData = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [imagePreview, setImagePreview] = useState(null);

//     useEffect(() => {
//         // Fetch user data
//         const fetchUserData = async () => {
//             const response = await axios.get('http://localhost:8000/api/auth/profile/', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
//             });
//             dispatch(setUser(response.data)); // Dispatch user data to Redux
//         };

//         fetchUserData();
//     }, [dispatch]);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             dispatch(setUser({ ...userData, image: files[0] }));
//             setImagePreview(URL.createObjectURL(files[0]));
//         } else {
//             dispatch(setUser({ ...userData, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const formData = new FormData();
//         formData.append('username', userData.username);
//         formData.append('email', userData.email);
//         if (userData.image) {
//             formData.append('profile_picture', userData.image);  // Make sure this is correct
//         }
    
//         const token = localStorage.getItem('accessToken');
//         try {
//             const response = await axios.put('http://localhost:8000/api/auth/profile/', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             window.alert("Profile updated successfully!");
//             dispatch(setUser(response.data));
//             console.log(response.data);  // Log response to check if the upload was successful
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             window.alert("There was an error updating your profile.");
//         }
//     };
//     const handleBack = () => {
//         navigate('/home'); // Navigates to the homepage
//     };
    
//     return (
        
//         <div className="container">
//             <h1>Edit Profile</h1>
//             <hr />
//             <button className="back-btn" onClick={handleBack}>
//                 Back to Home
//             </button>
//             <div className="row">
//                 {/* Left column for image upload */}
//                 <div className="col-md-3">
//                     <div className="text-center">
//                     <img
//                     src={imagePreview || (userData.profile_picture ? `http://localhost:8000${userData.profile_picture}` : "https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png")}
//                     alt="profile"
//                   />
//                         <h6>Upload a different photo...</h6>
//                         <input type="file" name="image" className="form-control" onChange={handleChange} />
//                     </div>
//                 </div>

//                 {/* Edit form column */}
//                 <div className="col-md-9 personal-info">

//                     <h3>Personal info</h3>
//                     <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label className="col-md-3 control-label">Username:</label>
//                             <div className="col-md-8">
//                                 <input
//                                     className="form-control"
//                                     type="text"
//                                     name="username"
//                                     value={userData.username}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label className="col-lg-3 control-label">Email:</label>
//                             <div className="col-lg-8">
//                                 <input
//                                     className="form-control"
//                                     type="text"
//                                     name="email"
//                                     value={userData.email}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>

//                         <div className="form-group">
//                             <label className="col-md-3 control-label"></label>
//                             <div className="col-md-8">
//                                 <input type="submit" className="btn btn-primary" value="Save Changes" />
//                                 <span></span>
//                                 <input type="reset" className="btn btn-default" value="Cancel" />
//                             </div>
//                         </div>
//                     </form>
                    
//                 </div>
//             </div>
//             <hr />
//         </div>
//     );
// };

// export default EditProfile;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import '../style/EditProfile.css';

const EditProfile = () => {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/profile/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                dispatch(setUser(response.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data. Please try again.');
            }
        };

        fetchUserData();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            dispatch(setUser({ ...userData, image: file }));
            setImagePreview(URL.createObjectURL(file));
        } else {
            dispatch(setUser({ ...userData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        if (userData.image) {
            formData.append('profile_picture', userData.image);
        }

        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.put('http://localhost:8000/api/auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(setUser(response.data));
            navigate('/home');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('There was an error updating your profile. Please try again.');
        }
    };

    return (
        <div className="edit-profile-container">
            <button className="back-button" onClick={() => navigate('/home')}>
                Back to Home
            </button>
            <div className="edit-profile-card">
                <h1 className="card-title">Edit Profile</h1>
                <p className="card-description">Update your personal information and profile picture</p>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="avatar-section">
                        <div className="avatar">
                            <img 
                                src={imagePreview || (userData.profile_picture ? `http://localhost:8000${userData.profile_picture}` : "/placeholder.svg?height=128&width=128")} 
                                alt="Profile" 
                                className="avatar-image"
                            />
                        </div>
                        <label htmlFor="image" className="upload-label">
                            Upload new picture
                            <input 
                                id="image" 
                                type="file" 
                                name="image" 
                                className="file-input" 
                                onChange={handleChange} 
                                accept="image/*" 
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            value={userData.username || ''}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={userData.email || ''}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={() => navigate('/home')}>Cancel</button>
                        <button type="submit" className="save-button">Save Changes</button>
                    </div>
                </form>
            </div>
            {error && (
                <div className="error-alert">
                    <p className="error-title">Error</p>
                    <p className="error-description">{error}</p>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
