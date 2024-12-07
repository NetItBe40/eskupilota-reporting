import { useState } from "react";
import { Eye, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { VideoTable } from "@/components/VideoTable";
import { ViewsChart } from "@/components/ViewsChart";
import { DeviceChart } from "@/components/DeviceChart";
import { PeriodSelect } from "@/components/PeriodSelect";
import { fetchYouTubeStats, fetchYouTubeVideos, fetchViewsData, fetchDeviceData } from "@/api/youtube";

export default function Index() {
  const [period, setPeriod] = useState("3m");

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['youtube-stats', period],
    queryFn: fetchYouTubeStats
  });

  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ['youtube-videos', period],
    queryFn: fetchYouTubeVideos
  });

  const { data: viewsData, isLoading: isViewsLoading } = useQuery({
    queryKey: ['views-data', period],
    queryFn: fetchViewsData
  });

  const { data: deviceData, isLoading: isDeviceLoading } = useQuery({
    queryKey: ['device-data', period],
    queryFn: fetchDeviceData
  });

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
            value={stats?.views.toLocaleString() ?? '-'}
            icon={<Eye className="h-4 w-4 text-youtube-blue" />}
            trend={stats?.viewsTrend}
          />
          <StatCard
            title="Temps de visionnage"
            value={stats?.watchTime ?? '-'}
            icon={<TrendingUp className="h-4 w-4 text-youtube-blue" />}
          />
          <StatCard
            title="Abonnés"
            value={stats?.subscribers.toLocaleString() ?? '-'}
            icon={<ThumbsUp className="h-4 w-4 text-youtube-red" />}
          />
          <StatCard
            title="Engagement moyen"
            value="8.7%"
            icon={<MessageSquare className="h-4 w-4 text-youtube-red" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution des vues</h2>
            <ViewsChart data={viewsData ?? []} isLoading={isViewsLoading} />
          </div>
          
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Répartition par appareil</h2>
            <DeviceChart data={deviceData ?? []} isLoading={isDeviceLoading} />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Meilleures vidéos</h2>
          <VideoTable videos={videos ?? []} isLoading={isVideosLoading} />
        </div>
      </div>
    </div>
  );
}