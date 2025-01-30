import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import teamsData from '../../teams.json'; 
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const TeamDetail = () => {
  const { teamId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (teamId) {
      const teamData = teamsData.find((team) => team.id.toString() === teamId);
      if (teamData) {
        setTeam(teamData);
      } else {
        console.error(`Team with ID ${teamId} not found.`);
      }
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!team) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Team not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {team.logo ? (
        <Image source={{ uri: team.logo }} style={styles.logo} />
      ) : (
        <Text style={styles.noLogoText}>No Logo</Text>
      )}

      <Animated.Text style={[styles.teamName, animatedStyle]}>{team.name}</Animated.Text>

      {team.country && (
        <View style={styles.countryContainer}>
          <Text style={styles.info}>Country: {team.country}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 50,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    fontSize: 18,
    color: '#555',
  },
  noLogoText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default TeamDetail;
