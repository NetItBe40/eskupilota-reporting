import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContentType {
  type: string;
  title: string;
  engagement: string;
  reach: number;
}

interface ContentTypeTableProps {
  data: ContentType[];
  isLoading?: boolean;
}

export function ContentTypeTable({ data, isLoading }: ContentTypeTableProps) {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook-blue" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead className="text-right">Engagement</TableHead>
            <TableHead className="text-right">Portée</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.type}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell className="text-right">{row.engagement}</TableCell>
              <TableCell className="text-right">{row.reach.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}