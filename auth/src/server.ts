import app from "./index";
import dbConnection from "./database/db.connection";

dbConnection();

if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be defined!!!");
}

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
