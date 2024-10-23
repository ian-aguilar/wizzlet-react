import { useEffect, useState } from "react";
import { VITE_APP_API_URL } from "@/config";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket } from "@/redux/slices/socketSlice";

const useSocket = (token: string | null | undefined): Socket | null => {
  const dispatch = useDispatch();
  const [socket, setLocalSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Only connect the socket if token is available
    if (!token) return;

    const newSocket = io(VITE_APP_API_URL, {
      transports: ["websocket"],
      query: { token },
    });

    // Set socket state locally
    setLocalSocket(newSocket);

    newSocket.on("connect", () => {
      dispatch(setSocket(newSocket));
    });

    newSocket.on("disconnect", () => {
      dispatch(setSocket(null));
    });

    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      dispatch(setSocket(null));
    };
  }, [token, dispatch]);

  return socket;
};

export default useSocket;
