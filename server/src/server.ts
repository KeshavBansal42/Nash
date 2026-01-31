import http from "http";
import app from "./app.js";
import { initSocket } from "./websocket/socketServer.js";

const server = http.createServer(app);
const port = process.env.PORT || 3000;

initSocket(server);

server.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
