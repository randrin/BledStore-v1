import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.SERVER_PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_UPLOADED_FILE_URL_LINK: `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}`,
};
