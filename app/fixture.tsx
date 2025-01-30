import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFonts } from 'expo-font';


const API_KEY = '4cc32fe2ed4c8dc87bfd0b5228c1f7bd9515fac2357ed49633d771fc64e44c48';

const Fixture = ({ teamId }) => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const [fontsLoaded] = useFonts({
    'BasketFont': require('../assets/fonts/EASPORTS15.ttf'),
  });

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get('https://apiv2.allsportsapi.com/basketball/', {
          params: {
            met: 'Fixtures',
            APIkey: API_KEY,
            teamId: teamId,
            from: '2024-12-01',
            to: '2024-12-31',
          },
        });

        if (response.data.result) {
          const filteredFixtures = response.data.result.filter(
            (item) => item.event_home_team_logo && item.event_away_team_logo
          ).slice(0, 20);
          setFixtures(filteredFixtures);
        } else {
          console.error('No fixtures found for this team.');
        }
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [teamId]);

  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;
    setIsScrolled(contentOffset.y > 0);
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const flatListRef = React.useRef();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (fixtures.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No upcoming matches found with logos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={fixtures}
        keyExtractor={(item, index) => (item.event_key ? item.event_key.toString() : index.toString())}
        ListHeaderComponent={
          <View style={styles.header}>
            {isScrolled && (
              <TouchableOpacity style={styles.arrowButton} onPress={scrollToTop}>
                <Text style={styles.arrowText}>↑</Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.title, styles.customFont]}>Upcoming Matches</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.fixtureItem}>
            <Text style={[styles.fixtureDate, styles.customFont]}>{item.event_date}</Text>
            <View style={styles.teamsContainer}>
              <View style={styles.teamWrapper}>
                <Image
                  source={{ uri: item.event_home_team_logo }}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
                <Text style={[styles.teamName, styles.customFont]}>{item.event_home_team}</Text>
              </View>
              <Text style={[styles.vsText, styles.customFont]}>vs</Text>
              <View style={styles.teamWrapper}>
                <Image
                  source={{ uri: item.event_away_team_logo }}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
                <Text style={[styles.teamName, styles.customFont]}>{item.event_away_team}</Text>
              </View>
            </View>
            <Text style={[styles.fixtureDetails, styles.customFont]}>
              Stadium: {item.event_stadium || 'N/A'} | Status: {item.event_status}
            </Text>
          </View>
        )}
        onScroll={handleScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'red',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
  },
  fixtureItem: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fixtureDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    textAlign: 'center',
    marginBottom: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 10,
  },
  fixtureDetails: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 16,
  },
  customFont: {
    fontFamily: 'BasketFont',
  },
});

export default Fixture;





// import React from "react";
// import { View, Text, Image, FlatList, StyleSheet } from "react-native";
// import teams from "../teams.json"; 

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>NBA Teams</Text>
//       <FlatList
//         data={teams}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.teamCard}>
//             <Image source={{ uri: item.logo }} style={styles.logo} />
//             <Text style={styles.teamName}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   teamCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   teamName: {
//     fontSize: 18,
//   },
// });

// export default HomeScreen;
