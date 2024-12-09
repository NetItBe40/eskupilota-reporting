import { useState } from "react";
import { Heart, Share2, MessageCircle, TrendingUp, Instagram as InstagramIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { PeriodSelect } from "@/components/PeriodSelect";
import { ViewsChart } from "@/components/ViewsChart";
import { ContentTypeTable } from "@/components/ContentTypeTable";
import { CommentsList } from "@/components/CommentsList";

const fetchInstagramStats = async () => ({
  followers: 25800,
  engagement: "4.8%",
  reach: 68000,
  interactions: 3500,
  followersTrend: {
    value: 3.8,
    isPositive: true
  }
});

const fetchEngagementData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 1500) + 300
  }));
};

const fetchReachData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 2000) + 500
  }));
};

const fetchTopContent = async () => {
  return [
    {
      type: "Reels",
      title: "Démonstration technique #1",
      engagement: "12.5%",
      reach: 35000
    },
    {
      type: "Carrousel",
      title: "Résumé du tournoi",
      engagement: "8.2%",
      reach: 28000
    },
    {
      type: "Photo",
      title: "Portrait du champion",
      engagement: "6.8%",
      reach: 22000
    },
    {
      type: "Story",
      title: "Coulisses de l'événement",
      engagement: "5.4%",
      reach: 18000
    }
  ];
};

const fetchRecentComments = async () => {
  return [
    {
      id: "1",
      author: {
        name: "Jean Dupont",
        avatar: "/placeholder.svg"
      },
      content: "Superbe performance ! 🏆",
      date: "Il y a 1h",
      post: "Démonstration technique #1"
    },
    {
      id: "2",
      author: {
        name: "Marie Lambert",
        avatar: "/placeholder.svg"
      },
      content: "Les photos sont magnifiques ! 📸",
      date: "Il y a 3h",
      post: "Résumé du tournoi"
    },
    {
      id: "3",
      author: {
        name: "Pierre Martin",
        avatar: "/placeholder.svg"
      },
      content: "Vivement le prochain tournoi ! 🎯",
      date: "Il y a 6h",
      post: "Portrait du champion"
    }
  ];
};

export default function InstagramAnalytics() {
  const [period, setPeriod] = useState("1m");

  const { data: stats, isLoading } = useQuery({
    queryKey: ['instagram-stats', period],
    queryFn: fetchInstagramStats
  });

  const { data: engagementData, isLoading: isEngagementLoading } = useQuery({
    queryKey: ['instagram-engagement-data', period],
    queryFn: fetchEngagementData
  });

  const { data: reachData, isLoading: isReachLoading } = useQuery({
    queryKey: ['instagram-reach-data', period],
    queryFn: fetchReachData
  });

  const { data: topContent, isLoading: isTopContentLoading } = useQuery({
    queryKey: ['instagram-top-content', period],
    queryFn: fetchTopContent
  });

  const { data: recentComments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ['instagram-recent-comments', period],
    queryFn: fetchRecentComments
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Instagram Analytics</h1>
          <PeriodSelect value={period} onValueChange={setPeriod} />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Abonnés"
            value={stats?.followers.toLocaleString() ?? '-'}
            icon={<div className="h-4 w-4 text-pink-600"><InstagramIcon /></div>}
            trend={stats?.followersTrend}
          />
          <StatCard
            title="Portée"
            value={stats?.reach.toLocaleString() ?? '-'}
            icon={<div className="h-4 w-4 text-pink-600"><Share2 /></div>}
          />
          <StatCard
            title="Engagement"
            value={stats?.engagement ?? '-'}
            icon={<div className="h-4 w-4 text-pink-600"><TrendingUp /></div>}
          />
          <StatCard
            title="Interactions"
            value={stats?.interactions.toLocaleString() ?? '-'}
            icon={<div className="h-4 w-4 text-pink-600"><MessageCircle /></div>}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution de l'engagement</h2>
            <ViewsChart data={engagementData ?? []} isLoading={isEngagementLoading} />
          </div>
          
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution de la portée</h2>
            <ViewsChart data={reachData ?? []} isLoading={isReachLoading} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Top contenus par type</h2>
            <ContentTypeTable data={topContent ?? []} isLoading={isTopContentLoading} />
          </div>
          
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Derniers commentaires</h2>
            <CommentsList comments={recentComments ?? []} isLoading={isCommentsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
