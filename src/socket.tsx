// useAdminSocket.ts
import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";

// single socket instance
const socket: Socket = io("http://192.168.110.134:8000");
// const socket: Socket = io("https://movieappbackend-lc3u.onrender.com");
export const useAdminSocket = (onNewRequest: (data: any) => void) => {
  useEffect(() => {

    // Register admin room
    socket.emit("register", { role: "admin" });

    // Listen for all new purchase requests
    socket.on("purchaseRequest:created", onNewRequest);

    return () => {
      socket.off("purchaseRequest:created", onNewRequest);
    };
  }, [onNewRequest]);
};
