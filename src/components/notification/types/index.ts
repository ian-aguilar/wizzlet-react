import { Type } from "@/constants";

export type notificationType = {
  id?: number;
  title: string;
  description: string;
  is_read: boolean;
  type: Type;
  product_id?: number;
  notification_type?: number;
  created_at: Date;
};

export interface NotificationItem {
  title: string;
  description: string;
  is_read: boolean;
  type: Type;
  product_id: number | undefined;
  notification_type: number | undefined;
  time: string;
}

export interface NotificationGroup {
  date: string;   // e.g., "Yesterday", "Today", or a specific date
  items: NotificationItem[];
}