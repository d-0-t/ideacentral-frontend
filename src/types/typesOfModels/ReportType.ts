export type ReportDocument = Document & {
  by: string[];
  ref: "User" | "Comment" | "Message" | "Idea";
  targetedUserId: string;
  contentId: string;
  content: any;
  description: string[];
  status: "new" | "pending" | "closed";
  assignedTo: string;
  reportCount: number;
};
