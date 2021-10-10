import io from "socket.io-client";

const socket = io.connect("http://80.78.244.144:8080/", { reconnect: true });

export default socket;
