import axios from 'axios';

// URL base para la API de balldontlie
const BASE_URL = 'https://www.balldontlie.io/api/v1';

// Función para obtener todos los jugadores
export const getPlayers = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return null;
  }
};

// Función para obtener los partidos de una temporada
export const getGames = async (teamId) => {
  if (!teamId || isNaN(teamId)) {
    console.error("Invalid teamId provided:", teamId);
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        team_ids: [teamId],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};

// Función para obtener detalles de un jugador
export const getPlayerStats = async (playerId) => {
  if (!playerId || isNaN(playerId)) {
    console.error("Invalid playerId provided:", playerId);
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return null;
  }
};
