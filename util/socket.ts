import { io } from "socket.io-client";
import { getToken } from ".";
const email = {
  email: "",
};
getToken("email").then((res) => console.log(res));
export const socket = io("http://192.168.20.8:8080", {
  autoConnect: false,

  query: {
    email: email.email,
  },
  transports: ["websocket"],
});
