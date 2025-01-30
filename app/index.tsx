import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Animated, TouchableOpacity, ActivityIndicator, Platform, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

const Login = () => {
  const router = useRouter();
  const [googleUser, setGoogleUser] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: Platform.select({
      ios: 'exp://localhost:19000',
      android: 'exp://localhost:19000',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserInfo = async () => {
        try {
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
          });
          const userInfo = await res.json();
          setGoogleUser(userInfo);

          router.push('/');
        } catch (error) {
          console.error('Error fetching Google user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, [response]);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'BasketFont': require('../assets/fonts/EASPORTS15.ttf'),
        });
        setFontsLoaded(true);
        setTimeout(() => setLoading(false), 2000);

        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
        Animated.timing(scaleAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
        Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/fondo1.jpg')} // Ruta a tu imagen en assets
      style={styles.container}
      resizeMode="cover" // Cambiar esta propiedad para asegurarse de que se adapte bien en desktop
    >
      <View style={styles.overlay}>
        <View style={styles.main}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Animated.Image
              source={require('../assets/images/Logito.png')}
              style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
            />
          </TouchableOpacity>

          <Animated.Text style={[styles.scoreText, { opacity: fadeAnim }]}>S C O R E</Animated.Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* 
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity style={styles.button} onPress={() => promptAsync({ useProxy: true, showInRecents: true })}>
              <Image
                 source={require('../assets/images/logo-google.png')} 
                 style={styles.googleLogo}
              />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>
          </Animated.View> 
          */}

          {/* {googleUser && <Text style={styles.userInfo}>Logged in as: {googleUser.name}</Text>} */}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Asegurarse de que el fondo ocupe el 100% del ancho
    height: Dimensions.get('window').height, // Asegura que la imagen de fondo ocupe toda la altura disponible
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 110,
  },
  scoreText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'BasketFont',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    lineHeight: 30,
    paddingHorizontal: 10,
    maxWidth: '80%',
    adjustsFontSizeToFit: true,
    numberOfLines: 1,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 8,
    width: '80%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  userInfo: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: 'orange',
  },
  googleLogo: {
    width: 30,
    height: 30,
  }
});

export default Login;
