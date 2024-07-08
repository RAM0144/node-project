import { MongoClient } from "mongodb";

import dotenv from "dotenv";

dotenv.config();

// console.log(process.env);

const dbUrl = "localhost:27017";

const dbName = process.env.DB_NAME || "local-fsd56we-tamil";

// username & password will be required on connecting to cloud DB
  const dbUsr = process.env.DB_USERNAME || "";
  const dbPassword = process.env.DB_PASSWORD || "";
  const dbCluster = process.env.DB_CLUSTER || ""
// Creating a client instance

const localUrl = `mongodb://${dbUrl}`;

const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/?retryWrites=true&w=majority&appName=Cluster0`
 
    //-local URL-MongoDb

// const client = new MongoClient(localUrl);

   //-Cloud URL-MongoDb Cloud Atlas

const client = new MongoClient(cloudUrl);

// Selecting a particular DB-Name

const db = client.db(dbName);

// Connecting to the asynchronosly
const connectToDB = async () => {
    try {
        await client.connect();
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error Connecting the database", error)
        process.exit(1);
    }
};

export { db, client };

export default connectToDB;



