import { useEffect, useState } from "react";
import { Eye, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { VideoTable } from "@/components/VideoTable";
import { ViewsChart } from "@/components/ViewsChart";
import { PeriodSelect } from "@/components/PeriodSelect";

// Données de test - À remplacer par l'intégration de l'API YouTube
const mockData = {
  stats: {
    views: 1234567,
    watchTime: "5.2K heures",
    subscribers: 45678,
    viewsTrend: { value: 12.5, isPositive: true },
  },
  videos: [
    {
      id: "1",
      title: "Comment créer un dashboard avec React",
      views: 12345,
      likes: 789,
      comments: 123,
      publishedAt: "2024-03-15",
    },
    // ... autres vidéos
  ],
  viewsData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 10000),
  })).reverse(),
};

export default function Index() {
  const [period, setPeriod] = useState("3m");
  const [isLoading, setIsLoading] = useState(false);

  // Simuler un chargement lors du changement de période
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [period]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">YouTube Analytics</h1>
          <PeriodSelect value={period} onValueChange={setPeriod} />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Vues totales"
            value={mockData.stats.views.toLocaleString()}
            icon={<Eye className="h-4 w-4 text-youtube-blue" />}
            trend={mockData.stats.viewsTrend}
          />
          <StatCard
            title="Temps de visionnage"
            value={mockData.stats.watchTime}
            icon={<TrendingUp className="h-4 w-4 text-youtube-blue" />}
          />
          <StatCard
            title="Abonnés"
            value={mockData.stats.subscribers.toLocaleString()}
            icon={<ThumbsUp className="h-4 w-4 text-youtube-red" />}
          />
          <StatCard
            title="Engagement moyen"
            value="8.7%"
            icon={<MessageSquare className="h-4 w-4 text-youtube-red" />}
          />
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Évolution des vues</h2>
          <ViewsChart data={mockData.viewsData} isLoading={isLoading} />
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Meilleures vidéos</h2>
          <VideoTable videos={mockData.videos} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}