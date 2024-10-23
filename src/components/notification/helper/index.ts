import moment from "moment";
import { NotificationGroup, notificationType } from "../types";

export const modifiedNotifications = (notifications: notificationType[]) => {
  const grouped = notifications.reduce(
    (acc: NotificationGroup[], notification) => {
      const notificationDate = moment(notification.created_at);
      const relativeTime = notificationDate.fromNow();
      let dateLabel: string;
      if (notificationDate.isSame(moment(), "day")) {
        dateLabel = "Today";
      } else if (notificationDate.isSame(moment().subtract(1, "day"), "day")) {
        dateLabel = "Yesterday";
      } else {
        dateLabel = notificationDate.format("MMMM DD, YYYY");
      }

      const existingGroup = acc.find((group) => group.date === dateLabel);
      const notificationItem = {
        title: notification.title,
        description: notification.description,
        is_read: notification.is_read,
        type: notification.type,
        product_id: notification.product_id,
        product_name: notification.product_name,
        user_name: notification.user_name,
        register_user: notification.register_user,
        notification_type: notification.notification_type,
        time: relativeTime,
      };

      if (existingGroup) {
        existingGroup.items.push(notificationItem);
      } else {
        acc.push({
          date: dateLabel,
          items: [notificationItem],
        });
      }

      return acc;
    },
    []
  );

  return grouped;
};
