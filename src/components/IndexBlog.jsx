import React, { useState, useEffect } from 'react';
import { fetchWalpapers } from './../firebaseconfig';
import WallpaperLikeButton from './Like';

const WallpapersList = () => {
  const [walpapers, setWalpapers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadWalpapers = async () => {
      try {
        const data = await fetchWalpapers();
        setWalpapers(data);
      } catch (err) {
        setError('Error al cargar los wallpapers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWalpapers();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando wallpapers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Wallpapers</h1>

      {Object.keys(walpapers).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Object.keys(walpapers).map((id) => {
            const post = walpapers[id];
            return (
              <div
                key={id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={post.img}
                  alt={`Imagen de ${post.title}`}
                  className="w-full h-60 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                  loading="lazy"
                />
                <div className="p-4">
                  <a
                    href={`/blog/${post.id}`}
                    className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-200"
                  >
                    {post.title}
                  </a>
                  <p className="text-gray-600">
                    Likes: <span className="font-bold">{post.likes}</span>
                  </p>
                  <WallpaperLikeButton client:load id={post.id} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay wallpapers disponibles.</p>
      )}
    </div>
  );
};

export default WallpapersList;