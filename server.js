import express from "express";
import { getDb, initMongoDb } from "./utils/mongodb.js";
import { getConn, initDb } from "./utils/mysql.js";
import users from "./routes/users.js"
import messages from "./routes/messages.js"



const app = express();
const PORT = 8002;

app.use(express.json());

app.use(async (req, res, next) => {
  req.mysqlDBConn = await getConn();
  req.mongodbCone = await getDb()
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server that manages products and orders",
  });
});

app.use("/api/auth", users);
app.use("/api/users", users);
app.use("/api/messages", messages);

 


app.listen(PORT, async () => {
  await initDb();
  await initMongoDb();
  console.log(`Server is running on port ${PORT}...`);
});
