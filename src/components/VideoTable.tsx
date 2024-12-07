import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
}

interface VideoTableProps {
  videos: Video[];
  isLoading?: boolean;
}

export function VideoTable({ videos, isLoading }: VideoTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-youtube-blue" />
      </div>
    );
  }

  return (
    <div className="rounded-md border animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead className="text-right">Vues</TableHead>
            <TableHead className="text-right">Likes</TableHead>
            <TableHead className="text-right">Commentaires</TableHead>
            <TableHead className="text-right">Date de publication</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell className="font-medium">{video.title}</TableCell>
              <TableCell className="text-right">{video.views.toLocaleString()}</TableCell>
              <TableCell className="text-right">{video.likes.toLocaleString()}</TableCell>
              <TableCell className="text-right">{video.comments.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {new Date(video.publishedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}