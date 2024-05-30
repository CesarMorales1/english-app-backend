import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  projectId: "english-plis",
  keyFilename: "./serviceAccountKey.json",
});

const bucket = storage.bucket("english-plis.appspot.com");

const uploadFileToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`${uuidv4()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(blob.name)}?alt=media`;
      const token = uuidv4();

      try {
        await blob.setMetadata({
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        });
        resolve(`${publicUrl}&token=${token}`);
      } catch (error) {
        reject(error);
      }
    });

    blobStream.end(file.buffer);
  });
};

export { bucket, uploadFileToFirebase };
