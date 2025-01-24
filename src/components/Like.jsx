import React, { useState } from 'react';
import { updateLikes } from './../firebaseconfig';

const WallpaperLikeButton = ({ id }) => {
  const [likes, setLikes] = useState(id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedLikes = await updateLikes(id);
      if (updatedLikes !== null) {
        setLikes(updatedLikes);
        console.log('Likes actualizados:', updatedLikes);
      } else {
        setError('Error al actualizar los likes');
      }
    } catch (err) {
      setError('Error al actualizar los likes');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black py-2 px-6 font-semibold text-lg rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:from-pink-600 hover:to-yellow-600" onClick={handleClick} disabled={loading}>
        {loading ? 'Cargando...' : 'Like'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WallpaperLikeButton;