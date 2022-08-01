import mongoose from "mongoose";

export const connect = () => {
  return mongoose.connect(process.env.ATLAS_URL).then((connection) => {
    if (!connection) {
      console.error("error", err);
    }
  });
};
