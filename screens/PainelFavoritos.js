
import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import CardAtleta from '../components/CardAtleta';
import { useFavoritos } from '../FavoritosContext'; 
import { useNavigation } from '@react-navigation/native';

const PainelFavoritos = () => {
  const navigation = useNavigation();
  const { favoritos, removerFavorito } = useFavoritos();

  const handleRemoverFavorito = (atleta) => {
    removerFavorito(atleta);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={item => item.idPlayer}
        renderItem={({ item }) => (
          <CardAtleta
            atleta={item}
            onFavoritar={handleRemoverFavorito}
            isFavorito={true}
          />
        )}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#018749',
    flex: 1,
  },
});

export default PainelFavoritos;
