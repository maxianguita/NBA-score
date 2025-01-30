import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data.json';

const TeamStandings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'BasketFont': require('../assets/fonts/EASPORTS15.ttf'),
  });

  useEffect(() => {
    setStandings(data.equipos);
    setLoading(false);
  }, []);

  const normalizeKey = (key) => key.toLowerCase().replace(/\s+/g, '-');

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.teamCard}>
      <Text style={[styles.teamName, styles.customFont]}>{item.nombre}</Text>
      <FlatList
        data={item.jugadores}
        keyExtractor={(player) => normalizeKey(player.nombre)}
        renderItem={({ item: player }) => (
          <View style={styles.playerCard}>
            <Text style={[styles.playerName, styles.customFont]}>{player.nombre}</Text>
            {player.imagen ? (
              <Image
                source={images[normalizeKey(player.imagen)] || require('../assets/images/lukadoncic.png')}
                style={styles.playerImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.noImageText}>Imagen no disponible</Text>
            )}
            <Text>Posición: {player.posición}</Text>
            <Text>Puntos: {player.estadísticas.puntos} - Rebotes: {player.estadísticas.rebotes}</Text>
            <Text>Asistencias: {player.estadísticas.asistencias} - Robos: {player.estadísticas.robos}</Text>
            <Text>Bloqueos: {player.estadísticas.bloqueos} - % Tiros: {player.estadísticas.porcentaje_tiros}%</Text>
          </View>
        )}
      />
    </View>
  );

  const images = {
    'jayson-tatum': require('../assets/images/tatum.png'),
    'kristaps-porzingis': require('../assets/images/kristapsporzingis.png'),
    'jaylen-brown': require('../assets/images/brown.png'),
    'derrick-white': require('../assets/images/white.png'),
    'devin-booker': require('../assets/images/devin.png'),
    'grayson-allen': require('../assets/images/allen.png'),
    'bradley-beal': require('../assets/images/bael.png'),
    'kevin-durant': require('../assets/images/duran.png'),
    'zach-lavine': require('../assets/images/zachlavine.png'),
    'nikola-vucevic': require('../assets/images/nikolavucevic.png'),
    'coby-white': require('../assets/images/cwhite.png'),
    'jalen-smith': require('../assets/images/jalen.png'),
    'lebron-james': require('../assets/images/lebronjames.png'),
    'anthony-davis': require('../assets/images/anthonydavis.png'),
    'dalton-knecht': require('../assets/images/dalton.png'),
    'rui-hachimura': require('../assets/images/hachimura.png'),
    'luka-doncic': require('../assets/images/lukadoncic.png'),
    'tim-hardaway-jr': require('../assets/images/timhardawayjr.png'),
    'kyrie-irving': require('../assets/images/irvyn.png'),
    'klay-thompson': require('../assets/images/klay.png'),
    'stephen-curry': require('../assets/images/curry.png'),
    'jonathan-kuminga': require('../assets/images/kuminga.png'),
    'buddy-hield': require('../assets/images/hield.png'),
    'bradin-podziemski': require('../assets/images/bradin.png'),
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
      <Text style={[styles.title, styles.customFont]}>Team Standings</Text>
      <FlatList
        data={standings}
        keyExtractor={(item) => item.abbreviatura}
        renderItem={renderItem}
        numColumns={1} // Ajustando para una columna en móviles
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f0f0f0',
    paddingBottom: 40
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
    fontFamily: 'BasketFont',
  },
  teamCard: {
    flex: 1,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  playerCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playerImage: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    marginBottom: 8,
    borderRadius: 8,
  },
  noImageText: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
 customFont: {
    fontFamily: 'BasketFont',
  }, 
});

export default TeamStandings;
