import { DoubleTickSVG } from "@/assets/Svg";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationGroup, notificationType } from "./types";
import { Type } from "@/constants";
import {
  useFetchNotificationAPI,
  useSetMarkReadNotificationAPI,
} from "./services";
import { modifiedNotifications } from "./helper";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [hasMore, setHasMore] = useState(true); // Track if there are more notifications to load
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState<boolean>(false);
  const [isNotRead, setIsNotRead] = useState<boolean>(true);
  const [notificationType, setNotificationType] = useState<Type>(
    Type.NOTIFICATION
  );
  const [notifications, setNotifications] = useState<notificationType[]>([]);

  const { getNotificationAPI } = useFetchNotificationAPI();
  const { setMarkReadAPI } = useSetMarkReadNotificationAPI();

  // Fetch additional notifications
  const fetchMoreNotifications = async () => {
    const { data, error } = await getNotificationAPI({
      page,
      notificationType,
    });

    if (data && !error) {
      if (notifications && notifications.length > 0) {
        setNotifications((prev: any) => {
          if (prev && prev?.length > 0) return [...prev, ...data?.data];
          else return data?.data;
        });
      } else {
        setIsNotRead(false);
        setNotifications(data?.data);
        for (let item of data?.data) {
          if (!item.is_read) {
            setIsNotRead(true);
          }
        }
      }
      if (data?.data.length === 0) {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  };

  const groupedNotifications = modifiedNotifications(notifications);

  const handleMarkRead = async () => {
    const ids = notifications?.map((item) => item.id);
    const { data } = await setMarkReadAPI({ ids: ids });
    if (data) {
      setReload((prev) => !prev);
      setNotifications([]);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      await fetchMoreNotifications();
    };

    fetchNotifications();
  }, [notificationType, reload]);

  return (
    <div>
      <div className="notificationHead flex justify-between gap-4 flex-wrap  py-5 px-4 ">
        {isNotRead == true && (
          <>
            <h2 className="font-semibold text-base text-blackPrimary">
              {" "}
              {/* Notifications{" "} */}
            </h2>
            <span
              onClick={handleMarkRead}
              className="inline-flex text-greenPrimary gap-1 items-center cursor-pointer"
            >
              <DoubleTickSVG className="text-greenPrimary" /> Mark as read
            </span>
          </>
        )}
      </div>
      <div className="TabLinksContainer border-b border-black/20 flex  font-medium gap-[2px] ">
        <span
          onClick={() => {
            if (notificationType === Type.ALERT) {
              setNotificationType(Type.NOTIFICATION);
              setNotifications([]);
              setPage(1);
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
              setNotifications([]);
              setPage(1);
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
            dataLength={notifications ? Number(notifications?.length) : 0}
            next={fetchMoreNotifications}
            hasMore={hasMore}
            loader={<p className=""> Loading... </p>}
            height={400}
            endMessage={<p className="text-center">No more notifications</p>} // Message when no more data
          >
            {groupedNotifications && groupedNotifications.length > 0 ? (
              <div>
                {groupedNotifications.map((item: NotificationGroup, index) => {
                  return (
                    <div key={index}>
                      <h3 className="text-sm font-medium text-grayText">
                        {item.date}
                      </h3>
                      {item.items.length > 0 &&
                        item.items.map((notification, index) => {
                          return (
                            <div
                              key={index}
                              className={`NotificationBox  flex gap-3 items-center p-2 ${
                                notification.is_read
                                  ? `bg-white`
                                  : `bg-grayLightBody/10`
                              } rounded-md text-grayText  w-full mb-1`}
                            >
                              <div
                                className={`flex w-2 h-2 min-w-2 rounded-full ${
                                  notification.type === Type.NOTIFICATION &&
                                  !notification.is_read
                                    ? `bg-greenPrimary`
                                    : notification.type === Type.ALERT &&
                                      !notification.is_read
                                    ? `bg-redAlert`
                                    : `bg-grayLightBody/50`
                                }`}
                              >
                                &nbsp;
                              </div>
                              <div className="w-full">
                                <div className="">
                                  {notification.product_id ? (
                                    <Link
                                      to={`/inventory-management/product-form/1/${notification.product_id}`}
                                      className="underline text-blackPrimary font-medium"
                                    >
                                      #{notification?.product_name}
                                    </Link>
                                  ) : notification.register_user ? (
                                    <Link
                                      to={`/user-management/view/${notification.register_user}`}
                                      className="underline text-blackPrimary font-medium"
                                    >
                                      @{notification.user_name}
                                    </Link>
                                  ) : null}{" "}
                                  {notification.title}
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                  <p className="line-clamp-1">
                                    {notification.description}
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
                })}
              </div>
            ) : null}
          </InfiniteScroll>
        ) : (
          <div>
            <p className="text-center">No more notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Notifications;
