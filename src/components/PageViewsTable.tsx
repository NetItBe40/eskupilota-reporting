import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PageView {
  page: string;
  views: number;
  avgTimeOnPage: string;
  bounceRate: string;
}

interface PageViewsTableProps {
  data: PageView[];
  isLoading?: boolean;
}

export function PageViewsTable({ data, isLoading }: PageViewsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Vues</TableHead>
            <TableHead className="text-right">Temps moyen</TableHead>
            <TableHead className="text-right">Taux de rebond</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.page}</TableCell>
              <TableCell className="text-right">{row.views.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.avgTimeOnPage}</TableCell>
              <TableCell className="text-right">{row.bounceRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}