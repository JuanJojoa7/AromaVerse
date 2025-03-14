import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_CREDENTIALS_PATH || "");

admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
});

export default admin;
