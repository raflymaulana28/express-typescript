import app from "./config/app";
import env from "./envronment";

const PORT = env.getPort();

app.listen(PORT, () => {
  console.log("App running on port:" + PORT);
});
