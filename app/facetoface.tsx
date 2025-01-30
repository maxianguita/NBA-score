import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';

const facetoface = ({ firstTeamId, secondTeamId }: { firstTeamId: string; secondTeamId: string }) => {
  const [loading, setLoading] = useState(true);
  const [h2hData, setH2hData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const fetchH2HData = async () => {
    try {
      console.log('Fetching H2H data...');
      console.log(
        `URL: https://apiv2.allsportsapi.com/basketball/?met=H2H&APIkey=YOUR_API_KEY&firstTeamId=${firstTeamId}&secondTeamId=${secondTeamId}`
      );

      const response = await fetch(
        `https://apiv2.allsportsapi.com/basketball/?met=H2H&APIkey=YOUR_API_KEY&firstTeamId=${firstTeamId}&secondTeamId=${secondTeamId}`
      );
      const data = await response.json();
      console.log('API Response:', data);

      if (data.success === 1 && data.result?.H2H?.length > 0) {
        setH2hData(data.result.H2H);
        // Asumiendo que los logos están disponibles en data.result.H2H como URLs
        setLogos({
          [data.result.H2H[0].event_home_team]: data.result.H2H[0].home_team_logo, // Ejemplo
          [data.result.H2H[0].event_away_team]: data.result.H2H[0].away_team_logo, // Ejemplo
        });
      } else {
        setError('No H2H data found for the selected teams.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch H2H data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Uncomment to test with live API
    // fetchH2HData();

    // Datos simulados para pruebas
    setTimeout(() => {
      setLoading(false);
      setH2hData([
        {
          clave_evento: 1,
          event_home_team: 'Los Angeles Lakers',
          event_away_team: 'Golden State Warriors',
          resultado_final_del_evento: '112-98',
          fecha_del_evento: '2024-12-01',
          event_status: 'Finished',
          nombre_de_la_liga: 'NBA Regular Season',
          home_team_logo: 'URL_TO_LAKERS_LOGO', // Ejemplo URL
          away_team_logo: 'URL_TO_WARRIORS_LOGO', // Ejemplo URL
        },
        {
          clave_evento: 2,
          event_home_team: 'Boston Celtics',
          event_away_team: 'Miami Heat',
          resultado_final_del_evento: '105-101',
          fecha_del_evento: '2024-12-02',
          event_status: 'Finished',
          nombre_de_la_liga: 'NBA Regular Season',
          home_team_logo: 'URL_TO_CELTICS_LOGO', // Ejemplo URL
          away_team_logo: 'URL_TO_HEAT_LOGO', // Ejemplo URL
        },
        // Datos adicionales simulados...
      ]);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head-to-Head Data</Text>
      <FlatList
        data={h2hData}
        keyExtractor={(item) => item.clave_evento.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: logos[item.event_home_team] }} style={styles.logo} />
              <Text style={styles.cardTitle}>{item.event_home_team} vs {item.event_away_team}</Text>
              <Image source={{ uri: logos[item.event_away_team] }} style={styles.logo} />
            </View>
            <Text style={styles.cardText}>Result: {item.resultado_final_del_evento}</Text>
            <Text style={styles.cardText}>Date: {item.fecha_del_evento}</Text>
            <Text style={styles.cardText}>Status: {item.event_status}</Text>
            <Text style={styles.cardText}>League: {item.nombre_de_la_liga}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
  },
  card: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#FFF',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 16,
  },
  loadingText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
    borderRadius: 4,
  },
});

export default facetoface;
