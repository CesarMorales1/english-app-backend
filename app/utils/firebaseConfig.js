import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();

const storage = new Storage({
  projectId: "english-plis",
  keyFilename: "./serviceAccountKey.json",
});

const bucket = storage.bucket("english-plis.appspot.com");

export { bucket };
