import { useState } from "react";
import { Users, Share2, MessageSquare, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { PeriodSelect } from "@/components/PeriodSelect";

// Simulation des données Facebook
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

export default function Facebook() {
  const [period, setPeriod] = useState("3m");

  const { data: stats, isLoading } = useQuery({
    queryKey: ['facebook-stats', period],
    queryFn: fetchFacebookStats
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
      </div>
    </div>
  );
}