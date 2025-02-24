import { Server } from "socket.io";
import schedule from "node-schedule";
import { faker } from "@faker-js/faker";

const io = new Server(8080, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connection");
  socket.emit("test", "hello");

  schedule.scheduleJob("*/3 * * * * *", () => {
    io.emit("stock-feed", {
      AAPL: faker.number.float({ min: 500, max: 550, multipleOf: 0.01 }),
      GOOGLE: faker.number.float({ min: 600, max: 700, multipleOf: 0.01 }),
      MSFT: faker.number.float({ min: 700, max: 850, multipleOf: 0.01 }),
      AMZN: faker.number.float({ min: 800, max: 1000, multipleOf: 0.01 }),
      META: faker.number.float({ min: 900, max: 1200, multipleOf: 0.01 }),
    });
  });
});
