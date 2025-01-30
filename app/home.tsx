import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import teamsData from "../teams.json";  

const Home = () => {
  const [teams] = useState(teamsData); // Usa los datos directamente
  const router = useRouter();

  // Cargar la fuente personalizada
  const [fontsLoaded] = useFonts({
    'BasketFont': require('../assets/fonts/EASPORTS15.ttf'),
  });

  const renderTeamCard = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/detail/${item.id}`)} style={styles.card}>
      {item.logo ? (
        <Image source={{ uri: item.logo }} style={styles.teamLogo} />
      ) : (
        <Text style={styles.noLogoText}>No Logo</Text>
      )}
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.teamId}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <Text>Cargando fuente...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={[styles.navTitle, styles.customFont]}>Teams</Text>
        <TouchableOpacity onPress={() => router.push('/live')}>
          <Image source={require('../assets/images/lives.png')} style={styles.newLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Image source={require('../assets/images/nbalogo.png')} style={styles.nbaLogo} />
        </TouchableOpacity>
      </View>

      {/* Lista de equipos */}
      <ScrollView style={styles.teamsContainer}>
        <FlatList
          data={teams}
          renderItem={renderTeamCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      </ScrollView>

      {/* Botón para ver estadísticas */}
      <TouchableOpacity onPress={() => router.push('/standing')} style={styles.viewAllStatsButton}>
        <Text style={[styles.viewAllStatsText, styles.customFont]}>View All Stats</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#f8f8f8' },
  navbar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'black', padding: 30, borderRadius: 20, justifyContent: 'space-between' },
  nbaLogo: { width: 80, height: 60, resizeMode: 'contain' },
  navTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  customFont: { fontFamily: 'BasketFont' },
  newLogo: { width: 100, height: 100, resizeMode: 'contain' },
  card: { flex: 1, padding: 5, backgroundColor: '#fff', marginBottom: 10, borderRadius: 30, borderColor: 'black', borderWidth: 3, marginHorizontal: 10, alignItems: 'center' },
  gridContainer: { justifyContent: 'space-between' },
  teamLogo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 },
  teamName: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center' },
  teamId: { fontSize: 12, color: '#777', textAlign: 'center' },
  noLogoText: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  teamsContainer: { flex: 1, marginTop: 20 },
  viewAllStatsButton: { backgroundColor: 'black', padding: 10, borderRadius: 25, marginTop: 20, alignItems: 'center' },
  viewAllStatsText: { color: 'white', fontSize: 19, fontWeight: 'bold' },
});

export default Home;
