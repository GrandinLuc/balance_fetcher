import http from "http";
import fs from "fs";
import { ResponseBody } from "./src/types";
import { findBalance } from "./src/networks/DataFetcher";

// GET http://localhost:8080/balances/{network}/{address}
const HOST = "localhost";
const PORT = 8080;
require("dotenv").config({ path: __dirname + "/.env" });

const server = http.createServer(async (req, res) => {
  // regex match for an request in this format: GET http://localhost:8080/balances/{network}/{address}
  if (
    req.url?.match("/balances/[ -~]+/0x[A-Fa-f0-9]+") &&
    req.method === "GET"
  ) {
    // We only take the third and fourth values because they will correspond to the network and address in a string
    // that looks like this: `/balances/{network}/{address}`
    let [, , network, address] = req.url.split("/");

    // Read the mock_data.json file
    let responseBody: ResponseBody[] = [];

    try {
      responseBody = await findBalance(network, address);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(responseBody));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write("Internal server error");
    }

    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
