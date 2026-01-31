export interface Message {
  id: string;
  roomID: string;
  senderID: string;
  content: string;
  createdAt: Date;
}
