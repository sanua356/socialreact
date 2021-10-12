import io from "socket.io-client";

const socket = io.connect({ reconnect: true });

export default socket;
