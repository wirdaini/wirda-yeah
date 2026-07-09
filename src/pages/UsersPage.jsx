// 📁 src/pages/admin/UsersPage.jsx

import { useState, useEffect } from 'react';
import { usersAPI } from '../services/usersAPI';
import { Pencil, Trash2 } from 'lucide-react'; // ← TAMBAH ICON!

export default function UsersPage() {
  // === STATE ===
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',   // ← FULL_NAME DI ATAS!
    email: '',
    password: '',
    role: 'staff'
  });

  // === LOAD DATA ===
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat data user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === HANDLE FORM ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingUser) {
        await usersAPI.updateUser(editingUser.id, {
          full_name: formData.full_name,
          role: formData.role
        });
        setSuccess('User berhasil diupdate!');
      } else {
        await usersAPI.createUser({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          role: formData.role
        });
        setSuccess('User berhasil ditambahkan!');
      }

      resetForm();
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan user');
    } finally {
      setLoading(false);
    }
  };

  // === DELETE ===
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus user ini?')) return;

    try {
      setLoading(true);
      await usersAPI.deleteUser(id);
      setSuccess('User berhasil dihapus!');
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Gagal menghapus user');
    } finally {
      setLoading(false);
    }
  };

  // === RESET FORM ===
  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      password: '',
      role: 'staff'
    });
    setEditingUser(null);
    setShowModal(false);
  };

  // === EDIT ===
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      full_name: user.full_name || '',
      email: user.email,
      password: '',
      role: user.role || 'staff'
    });
    setShowModal(true);
  };

  // === RENDER ===
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen User</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-coffee-600 text-white px-4 py-2 rounded-lg hover:bg-coffee-700 flex items-center gap-2"
        >
          + Tambah User
        </button>
      </div>

      {/* ALERT */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{success}</div>
      )}

      {/* LOADING */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-coffee-50">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Nama</th>      {/* ← NAMA DI ATAS */}
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Aksi</th>    {/* ← TEXT CENTER */}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-coffee-500">
                  Belum ada data user
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{user.full_name || '-'}</td>  {/* ← NAMA DULUAN */}
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : user.role === 'super_admin'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-coffee-100 text-coffee-700'
                    }`}>
                      {user.role || 'staff'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">   {/* ← TEXT CENTER */}
                    <button 
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Tambah User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* === NAMA LENGKAP (DI ATAS) === */}
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  required
                />
              </div>

              {!editingUser && (
                <>
                  {/* === EMAIL === */}
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* === PASSWORD === */}
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                      required
                      minLength={6}
                    />
                  </div>
                </>
              )}

              {/* === ROLE === */}
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              {/* === TOMBOL === */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-coffee-600 text-white px-4 py-2 rounded-lg hover:bg-coffee-700 flex-1 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : (editingUser ? 'Update' : 'Simpan')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-coffee-100 text-coffee-800 px-4 py-2 rounded-lg hover:bg-coffee-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}