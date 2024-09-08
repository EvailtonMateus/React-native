import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PesquisaAtleta = ({ onResultados, onSearchExecuted }) => {
  const [novaBusca, setNovaBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscar = (text) => {
    setNovaBusca(text);
    setError(''); 
  };

  const pesquisar = async () => {
    const nomeAtleta = novaBusca.trim();
    if (!nomeAtleta) return;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nomeAtleta)}`;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (!data.player || data.player.length === 0) {
        onResultados([]);
        setError('Nenhum jogador encontrado.');
      } else {
        onResultados(data.player.slice(0, 10));
      }
    } catch (error) {
      console.error("Não é possível obter dados:", error);
      setError('Ocorreu um erro ao buscar os dados. Tente novamente.');
    } finally {
      setLoading(false);
      onSearchExecuted();
    }
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={novaBusca}
        onChangeText={buscar}
        placeholder="Digite o nome do atleta..."
      />
      <Button
        title="Pesquisar"
        onPress={pesquisar}
        disabled={loading} 
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // cor de fundo para visualização
    flex: 1
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PesquisaAtleta;
