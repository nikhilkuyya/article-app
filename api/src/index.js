import { start } from "./server";

start()
  .then(() => console.log("app world"))
  .catch(console.error);
