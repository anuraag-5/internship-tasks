'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : undefined
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      }
      
      setFormData({ name: '', email: '', age: '' });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age?.toString() || ''
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', age: '' });
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <h1>User Management System</h1>
      
      <div className={styles.formSection}>
        <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age (optional)"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add User'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.usersSection}>
        <h2>Users List</h2>
        {users.length === 0 ? (
          <p className={styles.emptyState}>No users found. Add your first user above!</p>
        ) : (
          <div className={styles.userGrid}>
            {users.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userInfo}>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  {user.age && <p>Age: {user.age}</p>}
                </div>
                <div className={styles.userActions}>
                  <button onClick={() => handleEdit(user)} className={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
