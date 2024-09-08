import React, { createContext, useState, useContext } from 'react';

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const adicionarFavorito = (atleta) => {
    setFavoritos((prev) => [...prev, atleta]);
  };

  const removerFavorito = (atleta) => {
    setFavoritos((prev) => prev.filter(fav => fav.idPlayer !== atleta.idPlayer));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (context === undefined) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider');
  }
  return context;
};

