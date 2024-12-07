import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ViewsData {
  date: string;
  views: number;
}

interface ViewsChartProps {
  data: ViewsData[];
  isLoading?: boolean;
}

export function ViewsChart({ data, isLoading }: ViewsChartProps) {
  if (isLoading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-youtube-blue" />
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full animate-fade-up">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#065fd4"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}