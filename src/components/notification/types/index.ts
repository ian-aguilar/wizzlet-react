import { Type } from "@/constants";

export type notificationType = {
  id?: number;
  title: string;
  description: string;
  is_read: boolean;
  type: Type;
  register_user?: number;
  product_id?: number;
  product_name?: string;
  user_name?: string;
  notification_type?: number;
  created_at: Date;
};

export interface NotificationItem {
  id?: number;
  title: string;
  description: string;
  is_read: boolean;
  type: Type;
  product_name: string | undefined;
  user_name: string | undefined;
  register_user: number | undefined;
  product_id: number | undefined;
  notification_type: number | undefined;
  time: string;
}

export interface NotificationGroup {
  date: string; // e.g., "Yesterday", "Today", or a specific date
  items: NotificationItem[];
}
