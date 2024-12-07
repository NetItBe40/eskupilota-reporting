import { useState } from "react";
import { Users, Clock, MousePointer, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { PeriodSelect } from "@/components/PeriodSelect";

// Simulation des données Matomo
const fetchMatomoStats = async () => ({
  visitors: 28500,
  avgTimeOnSite: "4:32",
  bounceRate: "35%",
  conversions: 850,
  visitorsTrend: {
    value: 8.7,
    isPositive: true
  }
});

export default function Matomo() {
  const [period, setPeriod] = useState("3m");

  const { data: stats, isLoading } = useQuery({
    queryKey: ['matomo-stats', period],
    queryFn: fetchMatomoStats
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Matomo Analytics</h1>
          <PeriodSelect value={period} onValueChange={setPeriod} />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Visiteurs"
            value={stats?.visitors.toLocaleString() ?? '-'}
            icon={<Users className="h-4 w-4 text-purple-600" />}
            trend={stats?.visitorsTrend}
          />
          <StatCard
            title="Temps moyen"
            value={stats?.avgTimeOnSite ?? '-'}
            icon={<Clock className="h-4 w-4 text-purple-600" />}
          />
          <StatCard
            title="Taux de rebond"
            value={stats?.bounceRate ?? '-'}
            icon={<MousePointer className="h-4 w-4 text-purple-600" />}
          />
          <StatCard
            title="Conversions"
            value={stats?.conversions.toLocaleString() ?? '-'}
            icon={<ArrowRight className="h-4 w-4 text-purple-600" />}
          />
        </div>
      </div>
    </div>
  );
}