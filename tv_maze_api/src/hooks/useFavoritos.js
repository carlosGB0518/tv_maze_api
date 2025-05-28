import { useState, useEffect } from 'react';

const CLAVE_LOCAL = 'series_favoritas';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem(CLAVE_LOCAL);
    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  const agregarFavorito = (serie) => {
    const existe = favoritos.some((fav) => fav.serie_id === serie.serie_id);
    if (!existe) {
      const nuevos = [...favoritos, serie];
      setFavoritos(nuevos);
      localStorage.setItem(CLAVE_LOCAL, JSON.stringify(nuevos));
    }
  };

  const eliminarFavorito = (serie_id) => {
    const nuevos = favoritos.filter((fav) => fav.serie_id !== serie_id);
    setFavoritos(nuevos);
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(nuevos));
  };

  const esFavorito = (serie_id) => {
    return favoritos.some((fav) => fav.serie_id === serie_id);
  };

  return {
    favoritos,
    agregarFavorito,
    eliminarFavorito,
    esFavorito,
  };
}
