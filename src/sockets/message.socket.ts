// src/sockets/message.socket.ts
import { io } from "socket.io-client";
import { queryClient } from "@/lib/react-query";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: {
    token: localStorage.getItem("access_token"),
  },
});

socket.on("new_message", (message) => {
  queryClient.invalidateQueries({
    queryKey: ["conversations"],
  });
});
