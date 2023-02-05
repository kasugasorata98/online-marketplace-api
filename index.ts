import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import glob from "glob";
import MongooseClient from "./src/lib/MongooseClient";

dotenv.config();
const app = express();

async function main() {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use("/.docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  const routerPaths = glob.sync("./src/api/v1/**/*.ts");
  const routes = await Promise.all(
    routerPaths.map(async (routerPath) => {
      const module = await import(`${routerPath}`);
      return module.default;
    })
  );

  routes.forEach((route) => {
    app.use("/api/v1", route);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("App listening at port: " + process.env.PORT);
    MongooseClient.connect(process.env.MONGODB_CONNECTION_STRING || "")
      .then(async (res) => {
        console.log("MongoDB connected to " + res.connections[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
main();
