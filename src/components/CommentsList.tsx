import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  post: string;
}

interface CommentsListProps {
  comments: Comment[];
  isLoading?: boolean;
}

export function CommentsList({ comments, isLoading }: CommentsListProps) {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 p-4 rounded-lg border bg-card">
          <Avatar>
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{comment.author.name}</span>
              <span className="text-sm text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">Sur : {comment.post}</p>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}