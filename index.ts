import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./src/api/v1/product";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import glob from "glob";
import MongooseClient from "./src/lib/MongooseClient";

dotenv.config();
const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jeromy's Api",
      version: "1.0.0",
      description: "Online Marketplace API",
    },
  },
  apis: glob.sync("./src/api/**/*.ts"),
};
const specs = swaggerJSDoc(swaggerOptions);

function main() {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use("/.docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use("/v1", productRouter);

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
