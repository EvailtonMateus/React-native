import React from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window'); 

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Seja bem-vindo(a) ao nosso aplicativo de busca de atletas!
      </Text>
      <Text style={styles.instructionText}>
        Por favor, clique em "Entrar" para realizar sua pesquisa.
      </Text>
      <Button
        title="Entrar"
        onPress={() => navigation.navigate('Home')}
        color="#1E90FF" // Customiza a cor do botão
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Verde mais vibrante
    padding: 16,
    width: width,
    height: height,
  },
  logo: {
    width: width * 0.8, // Define a largura da logo como 80% da largura da tela
    height: height * 0.2, // Define a altura da logo como 20% da altura da tela
    marginBottom: 20, // Espaço entre a logo e o texto
  },
  welcomeText: {
    fontSize: 28, // Tamanho de fonte maior para um impacto visual mais forte
    fontWeight: '700', // Negrito mais forte
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFFFFF', // Cor do texto branco para contraste com o fundo verde
    paddingHorizontal: 20, // Adiciona algum padding horizontal para evitar que o texto encoste nas bordas
  },
  instructionText: {
    fontSize: 18, // Tamanho de fonte um pouco maior para melhor legibilidade
    textAlign: 'center',
    marginBottom: 25, // Mais espaçamento para separar do botão
    color: '#E0E0E0', // Cor do texto mais clara para contraste suave
    paddingHorizontal: 20, // Adiciona padding horizontal
  },
});

export default LoginScreen;
