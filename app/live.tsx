import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const teams = [
  { id: '1', name: 'Los Angeles Lakers (vs) Magics', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&h=200&w=200' },
  { id: '2', name: 'Dallas Mavericks (vs) Hawks ', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/dal.png&h=200&w=200' },
  { id: '3', name: 'Golden State Warriors (vs) Pistols', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&h=200&w=200' },
  { id: '4', name: 'Chicago Bulls (vs) Hornets', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/chi.png&h=200&w=200' },
  { id: '5', name: 'Miami Heat (vs) Jazz', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mia.png&h=200&w=200' },
  { id: '6', name: 'Boston Celtics (vs) 76ers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&h=200&w=200' },
  { id: '7', name: 'Cleveland Cavaliers (vs) Pacers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&h=200&w=200' },
  { id: '8', name: 'Los Angeles Clippers (vs) Rockets', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lac.png&h=200&w=200' },
  { id: '9', name: 'Brooklyn Nets (vs) Bucks ', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bkn.png&h=200&w=200' },
  { id: '10', name: 'Sacramento Kings (vs) Sun', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sac.png&h=200&w=200' },
  { id: '11', name: 'Phoenix Suns (vs) Kings', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phx.png&h=200&w=200' },
  { id: '12', name: 'Denver Nuggets (vs) Knicks', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/den.png&h=200&w=200' },
  { id: '13', name: 'New York Knicks (vs) Nuggets', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ny.png&h=200&w=200' },
];

const LiveBasketballScores = () => {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Simular la carga de datos en vivo
    const interval = setInterval(() => {
      const mockScores = {};
      teams.forEach(team => {
        const randomScore = Math.floor(Math.random() * 110) + 80; 
        mockScores[team.id] = `${randomScore} - ${Math.floor(Math.random() * 120) + 80}`;
      });
      setScores(mockScores);
      setLoading(false);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Cargando puntajes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Live Basketball Scores</Text>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <View style={styles.teamCard}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.score}>{scores[item.id] || 'Score: N/A'}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    color: '#000',
    marginTop: 50, 
  },

  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  teamName: {
    fontSize: 18,
    flex: 1,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
   
  },
});

export default LiveBasketballScores;
