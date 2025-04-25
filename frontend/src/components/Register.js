import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token); // stocker le token
      navigate('/profile'); // rediriger vers le profil
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nom" value={name} onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={handleChange} required />
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;