import { useState } from "react";
import { Users, Share2, MessageSquare, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { PeriodSelect } from "@/components/PeriodSelect";
import { ViewsChart } from "@/components/ViewsChart";
import { ContentTypeTable } from "@/components/ContentTypeTable";
import { CommentsList } from "@/components/CommentsList";

const fetchFacebookStats = async () => ({
  followers: 15420,
  engagement: "12.3%",
  reach: 45000,
  interactions: 2800,
  followersTrend: {
    value: 5.2,
    isPositive: true
  }
});

const fetchEngagementData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 1000) + 200
  }));
};

const fetchInteractionsData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 500) + 100
  }));
};

const fetchTopContent = async () => {
  return [
    {
      type: "Vidéo",
      title: "Notre nouveau produit en action",
      engagement: "8.5%",
      reach: 25000
    },
    {
      type: "Photo",
      title: "L'équipe au complet",
      engagement: "6.2%",
      reach: 18000
    },
    {
      type: "Lien",
      title: "Article : 10 conseils pour...",
      engagement: "4.8%",
      reach: 15000
    },
    {
      type: "Status",
      title: "Grande annonce à venir !",
      engagement: "7.1%",
      reach: 20000
    }
  ];
};

const fetchRecentComments = async () => {
  return [
    {
      id: "1",
      author: {
        name: "Marie Dupont",
        avatar: "/placeholder.svg"
      },
      content: "Super initiative ! J'ai hâte d'en savoir plus.",
      date: "Il y a 2h",
      post: "Grande annonce à venir !"
    },
    {
      id: "2",
      author: {
        name: "Thomas Martin",
        avatar: "/placeholder.svg"
      },
      content: "Très intéressant, merci pour le partage !",
      date: "Il y a 5h",
      post: "Article : 10 conseils pour..."
    },
    {
      id: "3",
      author: {
        name: "Sophie Bernard",
        avatar: "/placeholder.svg"
      },
      content: "Belle présentation du produit !",
      date: "Il y a 8h",
      post: "Notre nouveau produit en action"
    }
  ];
};

export default function Facebook() {
  const [period, setPeriod] = useState("3m");

  const { data: stats, isLoading } = useQuery({
    queryKey: ['facebook-stats', period],
    queryFn: fetchFacebookStats
  });

  const { data: engagementData, isLoading: isEngagementLoading } = useQuery({
    queryKey: ['engagement-data', period],
    queryFn: fetchEngagementData
  });

  const { data: interactionsData, isLoading: isInteractionsLoading } = useQuery({
    queryKey: ['interactions-data', period],
    queryFn: fetchInteractionsData
  });

  const { data: topContent, isLoading: isTopContentLoading } = useQuery({
    queryKey: ['top-content', period],
    queryFn: fetchTopContent
  });

  const { data: recentComments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ['recent-comments', period],
    queryFn: fetchRecentComments
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Facebook Analytics</h1>
          <PeriodSelect value={period} onValueChange={setPeriod} />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Abonnés"
            value={stats?.followers.toLocaleString() ?? '-'}
            icon={<Users className="h-4 w-4 text-facebook-blue" />}
            trend={stats?.followersTrend}
          />
          <StatCard
            title="Portée"
            value={stats?.reach.toLocaleString() ?? '-'}
            icon={<Share2 className="h-4 w-4 text-facebook-blue" />}
          />
          <StatCard
            title="Engagement"
            value={stats?.engagement ?? '-'}
            icon={<TrendingUp className="h-4 w-4 text-facebook-blue" />}
          />
          <StatCard
            title="Interactions"
            value={stats?.interactions.toLocaleString() ?? '-'}
            icon={<MessageSquare className="h-4 w-4 text-facebook-blue" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution de l'engagement</h2>
            <ViewsChart data={engagementData ?? []} isLoading={isEngagementLoading} />
          </div>
          
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution des interactions</h2>
            <ViewsChart data={interactionsData ?? []} isLoading={isInteractionsLoading} />
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
