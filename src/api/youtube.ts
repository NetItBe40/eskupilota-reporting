// Simule des appels API - À remplacer par de vraies requêtes YouTube API
export const fetchYouTubeStats = async () => {
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
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 10000),
  })).reverse();
};

export const fetchDeviceData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { name: "Mobile", value: 45, color: "#FF0000" },
    { name: "Desktop", value: 35, color: "#065FD4" },
    { name: "Tablette", value: 15, color: "#4CAF50" },
    { name: "TV", value: 5, color: "#FF9800" },
  ];
};