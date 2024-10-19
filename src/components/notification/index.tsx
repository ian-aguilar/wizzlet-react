import { DoubleTickSVG } from "@/assets/Svg";
import { Link } from "react-router-dom";
// import { notificationsData } from "../constant";
import { Key, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { notificationType } from "./types";
import { notificationsData } from "./constant";
import { Type } from "@/constants";
import { useFetchNotificationAPI } from "./services";

const Notifications = () => {
  const [hasMore, setHasMore] = useState(true); // Track if there are more notifications to load
  const [page, setPage] = useState(1);
  const [notificationType, setNotificationType] = useState<Type>(
    Type.NOTIFICATION
  );
  const [notifications, setNotifications] = useState<notificationType[] | null>(
    notificationsData
  );

  const { getNotificationAPI } = useFetchNotificationAPI();

  // Fetch additional notifications
  const fetchMoreNotifications = async () => {
    const newNotifications = await getNotifications(page); // Simulate API request
    const notific = await getNotificationAPI({page});
    if (newNotifications && newNotifications?.length > 0) {
      setNotifications((prev: any) => {
        if (prev && prev?.length > 0) return [...prev, ...newNotifications];
        else return [];
      });
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false); // No more data to load
    }
  };
  const groupedNotifications = notifications?.reduce(
    (acc: any, notification: notificationType) => {
      const { date, id, smallMsg, longMsg, time } = notification;

      const existingGroup = acc.find((group: any) => group.date === date);

      if (existingGroup) {
        existingGroup.items.push({ id, smallMsg, longMsg, time });
      } else {
        acc.push({ date, items: [{ id, smallMsg, longMsg, time }] });
      }
      return acc;
    },
    []
  );
  useEffect(() => {
    fetchMoreNotifications();
  }, []);
  return (
    <div>
      <div className="notificationHead flex justify-between gap-4 flex-wrap  py-5 px-4 ">
        <h2 className="font-semibold text-base text-blackPrimary">
          {" "}
          Notifications{" "}
        </h2>
        <Link
          to=""
          className="inline-flex text-greenPrimary gap-1 items-center"
        >
          {" "}
          <DoubleTickSVG className="text-greenPrimary" /> Mark as read
        </Link>
      </div>
      <div className="TabLinksContainer border-b border-black/20 flex  font-medium gap-[2px] ">
        <span
          onClick={() => {
            if (notificationType === Type.ALERT) {
              setNotificationType(Type.NOTIFICATION);
            }
          }}
          className={`px-7 pb-3 inline-block text-blackPrimary border-b-[2px] ${
            notificationType === Type.NOTIFICATION
              ? `border-b-greenPrimary`
              : ``
          }  mb-[-2px] hover:text-blackPrimary hover:bg-gray-100   hover:border-b-[2px]  hover:mb-[-2px]`}
        >
          Notification
        </span>
        <span
          onClick={() => {
            if (notificationType === Type.NOTIFICATION) {
              setNotificationType(Type.ALERT);
            }
          }}
          className={`px-7 pb-3 inline-block text-blackPrimary border-b-[2px] ${
            notificationType === Type.ALERT ? `border-b-greenPrimary` : ``
          }  mb-[-2px] hover:text-blackPrimary hover:border-b-[2px] hover:bg-gray-100  hover:mb-[-2px]`}
        >
          Alerts
        </span>
      </div>

      <div className="TabContent py-5 px-4 max-h-[50vh] overflow-y-auto scroll-design">
        {notifications && notifications.length > 0 ? (
          <InfiniteScroll
            className="max-h-[50vh] h-[397px]; scroll-design"
            dataLength={notifications ? Number(notifications?.length) : 0} // Current length of the notifications array
            next={fetchMoreNotifications} // Function to load more data
            hasMore={hasMore} // Determines if there are more notifications to load
            loader={<h4>Loading...</h4>} // Loading component
            height={400} // Specify height for the scrollable area
            endMessage={<p className="text-center">No more notifications</p>} // Message when no more data
          >
            {groupedNotifications && groupedNotifications.length > 0 ? (
              <div>
                {groupedNotifications.map(
                  (
                    item: {
                      date: string;
                      items: any[];
                    },
                    index: Key | null | undefined
                  ) => {
                    return (
                      <div key={index}>
                        <h3 className="text-sm font-medium text-grayText">
                          {item.date}
                        </h3>
                        {item.items.length > 0 &&
                          item.items.map((notification) => {
                            return (
                              <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                                <div className="flex w-2 h-2 min-w-2 rounded-full bg-grayLightBody/50 ">
                                  &nbsp;
                                </div>
                                <div className="w-full">
                                  <div>
                                    <Link
                                      to=""
                                      className="underline text-blackPrimary font-medium"
                                    >
                                      {notification.id}
                                    </Link>{" "}
                                    {notification.smallMsg}
                                  </div>
                                  <div className="flex gap-2 justify-between items-center">
                                    <p className="line-clamp-1">
                                      {notification.longMsg}
                                    </p>
                                    <p className="text-xs">
                                      {" "}
                                      {notification.time}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}
          </InfiniteScroll>
        ) : (
          <div>
            <p className="text-center">No more notifications</p>
          </div>
        )}
      </div>

      {/* <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-grayText">
                        Yesterday
                      </h3>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>
                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-redAlert ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium"
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div>

                      <div className="NotificationBox  flex gap-3 items-center p-2 bg-grayLightBody/10 rounded-md text-grayText  w-full mb-1">
                        <div className="flex w-2 h-2 min-w-2 rounded-full bg-greenPrimary ">
                          &nbsp;
                        </div>
                        <div className="w-full">
                          <div>
                            <Link
                              to=""
                              className="underline text-blackPrimary font-medium "
                            >
                              @user123
                            </Link>{" "}
                            Registered
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="line-clamp-1">
                              use123 has added a new register{" "}
                            </p>
                            <p className="text-xs"> 1m ago </p>
                          </div>
                        </div>
                      </div> */}
    </div>
  );
};
export default Notifications;

// Simulate fetching notifications
const getNotifications = async (page: number) => {
  // Replace this with your actual fetch logic
  // Simulate fetching 50 notifications at a time
  return new Array(50).fill(0).map((_, index) => ({
    id: `Notification ID ${page * 50 + index + 1}`,
    smallMsg: `Small message for notification ${page * 50 + index + 1}`,
    longMsg: `Detailed long message for notification ${page * 50 + index + 1}`,
    time: `${index + 1}m ago`,
  }));
};
