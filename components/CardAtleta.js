import React, { useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import defaultImage from '../assets/defaultImage.png'; 

const CardAtleta = ({ atleta, onFavoritar, isFavorito }) => {
  const imageSrc = atleta.strThumb ? { uri: atleta.strThumb } : defaultImage;

  const handlePress = useCallback(() => {
    onFavoritar(atleta); // Chama a função passada como prop
  }, [atleta, onFavoritar]);

  return (
    <View style={styles.cardAtleta}>
      <View style={styles.imagemE}>
        <Image source={imageSrc} style={styles.imagemAtleta} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.nome}>
          {atleta.strPlayer}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text>Esporte: {atleta.strSport}</Text>
        <Text>Time: {atleta.strTeam}</Text>
        <Text>Nacionalidade: {atleta.strNationality}</Text>
        <Button
          title={isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardAtleta: {
    flexDirection: 'row', // Alinha a imagem e as informações horizontalmente
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  imagemAtleta: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10, // Espaço entre a imagem e as informações
  },
  imagemE: {
    alignItems: 'center', // Centraliza verticalmente a imagem e o nome
  },
  infoContainer: {
    flex: 1, // Faz com que o container das informações use o restante do espaço
    justifyContent: 'space-between', 
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    flexWrap: 'wrap', // Permite quebra de linha
    width: 100, // Define a largura máxima da caixa de texto
  },
});

export default CardAtleta;
