// useAdminSocket.ts
import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";

// single socket instance
const socket: Socket = io("http://192.168.110.124:8000");
export const messageSocket: Socket = io("http://192.168.110.124:8080")

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

export const useMessageSocket = (
  userId: string | null
) => {
  useEffect(() => {
    if (!userId) return;


    messageSocket.emit("register", { userId, role: "user" });
       messageSocket.emit("register", { role: "admin" });

    return () => {
    
    };
  }, [userId]);
}
