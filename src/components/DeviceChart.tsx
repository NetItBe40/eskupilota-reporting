import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

interface DeviceChartProps {
  data: DeviceData[];
  isLoading?: boolean;
}

export function DeviceChart({ data, isLoading }: DeviceChartProps) {
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}