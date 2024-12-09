import { useState } from "react";
import { Users, Clock, MousePointer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { PeriodSelect } from "@/components/PeriodSelect";
import { ViewsChart } from "@/components/ViewsChart";
import { PageViewsTable } from "@/components/PageViewsTable";

// Simulation des données Matomo
const fetchMatomoStats = async () => ({
  visitors: 28500,
  avgTimeOnSite: "4:32",
  bounceRate: "35%",
  returningVisitors: 12000,
  newVisitors: 16500,
  visitorsTrend: {
    value: 8.7,
    isPositive: true
  }
});

const fetchVisitorsData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 1000) + 500
  }));
};

const fetchVisitorTypesData = async () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 600) + 200,
    returning: Math.floor(Math.random() * 400) + 100
  }));
};

const fetchTopPages = async () => {
  return [
    {
      page: "/accueil",
      views: 12500,
      avgTimeOnPage: "2:45",
      bounceRate: "28%"
    },
    {
      page: "/produits",
      views: 8900,
      avgTimeOnPage: "3:15",
      bounceRate: "32%"
    },
    {
      page: "/contact",
      views: 5600,
      avgTimeOnPage: "1:50",
      bounceRate: "45%"
    },
    {
      page: "/blog",
      views: 4200,
      avgTimeOnPage: "4:20",
      bounceRate: "25%"
    },
    {
      page: "/a-propos",
      views: 3100,
      avgTimeOnPage: "2:30",
      bounceRate: "38%"
    }
  ];
};

export default function Matomo() {
  const [period, setPeriod] = useState("1m");

  const { data: stats, isLoading } = useQuery({
    queryKey: ['matomo-stats', period],
    queryFn: fetchMatomoStats
  });

  const { data: visitorsData, isLoading: isVisitorsLoading } = useQuery({
    queryKey: ['visitors-data', period],
    queryFn: fetchVisitorsData
  });

  const { data: visitorTypesData, isLoading: isVisitorTypesLoading } = useQuery({
    queryKey: ['visitor-types-data', period],
    queryFn: fetchVisitorTypesData
  });

  const { data: topPages, isLoading: isTopPagesLoading } = useQuery({
    queryKey: ['top-pages', period],
    queryFn: fetchTopPages
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
            title="Visiteurs récurrents"
            value={stats?.returningVisitors.toLocaleString() ?? '-'}
            icon={<Users className="h-4 w-4 text-purple-600" />}
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Évolution des visiteurs</h2>
            <ViewsChart data={visitorsData ?? []} isLoading={isVisitorsLoading} />
          </div>
          
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Visiteurs récurrents vs nouveaux</h2>
            <ViewsChart data={visitorTypesData ?? []} isLoading={isVisitorTypesLoading} />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Pages les plus consultées</h2>
          <PageViewsTable data={topPages ?? []} isLoading={isTopPagesLoading} />
        </div>
      </div>
    </div>
  );
}
