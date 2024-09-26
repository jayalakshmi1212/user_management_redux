import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../store/adminUserSlice';
import '../style/AdminDashboard.css';
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.adminUsers);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editUser, setEditUser] = useState({ id: null, username: '', email: '' });

  useEffect(() => {
    console.log("Fetching users with search query:", search);
    dispatch(fetchUsers(search));
  }, [search, dispatch]);

  const handleCreateUser = () => {
    console.log("Creating user:", newUser);
    dispatch(createUser(newUser))
      .then(() => {
        console.log("User created successfully");
        setNewUser({ username: '', email: '' }); // Clear input after creation
      })
      .catch(err => console.error("Error creating user:", err));
  };

  const handleUpdateUser = (user) => {
    console.log("Editing user:", user);
    setEditUser(user); // Populate edit fields with current user data
  };

  const saveUpdatedUser = () => {
    console.log("Saving updated user:", editUser);
    dispatch(updateUser({ id: editUser.id, userData: editUser }))
      .then(() => {
        console.log("User updated successfully");
        setEditUser({ id: null, username: '', email: '' }); // Reset after saving
      })
      .catch(err => console.error("Error updating user:", err));
  };

  const handleDeleteUser = (id) => {
    console.log("Deleting user with ID:", id);
    dispatch(deleteUser(id))
      .then(() => console.log("User deleted successfully"))
      .catch(err => console.error("Error deleting user:", err));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <input 
        type="text" 
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search users..." 
      />
      <button onClick={() => dispatch(fetchUsers(search))}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <h2>Create User</h2>
      <input 
        type="text" 
        value={newUser.username} 
        onChange={e => setNewUser({ ...newUser, username: e.target.value })} 
        placeholder="Username"
      />
      <input 
        type="email" 
        value={newUser.email} 
        onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
        placeholder="Email"
      />
      <button onClick={handleCreateUser}>Create</button>

      <h2>Edit User</h2>
      {editUser.id && (
        <>
          <input 
            type="text" 
            value={editUser.username} 
            onChange={e => setEditUser({ ...editUser, username: e.target.value })} 
            placeholder="Edit Username"
          />
          <input 
            type="email" 
            value={editUser.email} 
            onChange={e => setEditUser({ ...editUser, email: e.target.value })} 
            placeholder="Edit Email"
          />
          <button onClick={saveUpdatedUser}>Save</button>
        </>
      )}

      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-btn" onClick={() => handleUpdateUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
