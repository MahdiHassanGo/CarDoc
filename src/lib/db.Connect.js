import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameaObj = "test_services"; // Corrected name

export default async function dbConnect(collectionName) {
  const uri = process.env.MongoURI;

  if (!uri) {
    throw new Error("MongoURI environment variable is not defined.");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    return client.db(process.env.DbName).collection(collectionName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}