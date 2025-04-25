// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération du profil', err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (!token) return <p>Non connecté</p>;
  if (!user) return <p>Chargement du profil...</p>;

  return (
    <div>
      <h2>Profil utilisateur</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
