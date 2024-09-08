import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import axios from 'axios';
import CardAtleta from '../components/CardAtleta';
import { useFavoritos } from '../FavoritosContext'; 
import searchNotFound from '../assets/searchNotFound.png';
import banner from '../assets/banner.png';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const TelaPrincipal = () => {
  const navigation = useNavigation();
  const [resultados, setResultados] = useState([]);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false);
  const [novaBusca, setNovaBusca] = useState('');
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();

  const buscar = (text) => {
    setNovaBusca(text);
  };

  const pesquisar = async () => {
    const nomeAtleta = novaBusca.trim();
    if (!nomeAtleta) return;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nomeAtleta)}`;
    
    try {
      const response = await axios.get(url);
      const data = response.data;
      
      if (!data.player || data.player.length === 0) {
        setResultados([]);
        setIsSearchExecuted(true);
      } else {
        setResultados(data.player.slice(0, 10));
        setIsSearchExecuted(true);
      }
    } catch (error) {
      console.error("Não é possível obter dados:", error);
    }
  };

  return (
    <View style={[{ flex: 1 }, styles.container]}>
      <Image source={banner} style={styles.banner} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={novaBusca}
          onChangeText={buscar}
          placeholder="Digite o nome do atleta..."
        />
        <Button
          title="Pesquisar"
          onPress={pesquisar}
        />
      </View>
      <View style={styles.resultadosContainer}>
        {isSearchExecuted && resultados.length === 0 ? (
          <View style={styles.semResultados}>
            <Image source={searchNotFound} style={styles.searchNotFound} />
            <Text>Nenhum jogador encontrado!</Text>
          </View>
        ) : (
          <FlatList
            data={resultados}
            keyExtractor={item => item.idPlayer}
            renderItem={({ item }) => (
              <CardAtleta
                atleta={item}
                onFavoritar={favoritos.some(fav => fav.idPlayer === item.idPlayer) ? removerFavorito : adicionarFavorito}
                isFavorito={favoritos.some(fav => fav.idPlayer === item.idPlayer)}
              />
            )}
          />
        )}
      </View>
      <View style={styles.favoritosContainer}>
        <Button
          title="Ver Favoritos"
          onPress={() => navigation.navigate('Painel de Favoritos')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
      },
      searchContainer: {
        padding: 16,
        alignItems: 'center',
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: '100%',
        marginBottom: 10,
      },
      resultadosContainer: {
        flex: 1,
      },
      semResultados: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchNotFound: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
      },
      favoritosContainer: {
        padding: 16,
      },
      container: {
        backgroundColor: '#018749', 
      },
});

export default TelaPrincipal;
