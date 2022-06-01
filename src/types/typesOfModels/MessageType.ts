export type MessageDocument = Document & {
  sender: string;
  recipient: string;
  message: string;
};
