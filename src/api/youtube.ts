// Configuration requise :
// 1. Créer un projet sur Google Cloud Console
// 2. Activer YouTube Data API v3 et YouTube Analytics API
// 3. Configurer OAuth 2.0 avec les scopes :
//    - youtube.readonly
//    - youtube.analytics.readonly
// 4. Obtenir les credentials :
//    - CLIENT_ID
//    - CLIENT_SECRET
//    - API_KEY

// TODO: Remplacer par vos credentials
const YOUTUBE_CONFIG = {
  CLIENT_ID: process.env.YOUTUBE_CLIENT_ID || '',
  CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET || '',
  API_KEY: process.env.YOUTUBE_API_KEY || '',
};

// Simule des appels API - À remplacer par de vraies requêtes YouTube API
export const fetchYouTubeStats = async () => {
  // Vérification des credentials
  if (!YOUTUBE_CONFIG.CLIENT_ID || !YOUTUBE_CONFIG.API_KEY) {
    console.warn('YouTube credentials manquants. Utilisation des données de test.');
  }
  
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    views: 1234567,
    watchTime: "5.2K heures",
    subscribers: 45678,
    viewsTrend: { value: 12.5, isPositive: true },
  };
};

export const fetchYouTubeVideos = async () => {
  if (!YOUTUBE_CONFIG.CLIENT_ID || !YOUTUBE_CONFIG.API_KEY) {
    console.warn('YouTube credentials manquants. Utilisation des données de test.');
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [{
    id: "1",
    title: "Comment créer un dashboard avec React",
    views: 12345,
    likes: 789,
    comments: 123,
    publishedAt: "2024-03-15",
  }];
};

export const fetchViewsData = async () => {
  if (!YOUTUBE_CONFIG.CLIENT_ID || !YOUTUBE_CONFIG.API_KEY) {
    console.warn('YouTube credentials manquants. Utilisation des données de test.');
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 10000),
  })).reverse();
};

export const fetchDeviceData = async () => {
  if (!YOUTUBE_CONFIG.CLIENT_ID || !YOUTUBE_CONFIG.API_KEY) {
    console.warn('YouTube credentials manquants. Utilisation des données de test.');
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { name: "Mobile", value: 45, color: "#FF0000" },
    { name: "Desktop", value: 35, color: "#065FD4" },
    { name: "Tablette", value: 15, color: "#4CAF50" },
    { name: "TV", value: 5, color: "#FF9800" },
  ];
};
