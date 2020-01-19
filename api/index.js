import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import galleryRoutes from "./server/routes/GalleryRoutes";
import userRoutes from "./server/routes/UserRoutes";

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV;

app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/user", userRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Well, there is nothing here",
    version: `I think this is the ${env} one`
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
