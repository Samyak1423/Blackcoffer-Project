const { MongoClient } = require('mongodb');
const fs = require('fs'); 


const uri = "mongodb+srv://Samyak:14Nov2004@cluster0.lkf930r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('blackcoffer_dashboard');
    const collection = database.collection('insights');

    const data = JSON.parse(fs.readFileSync('jsondata.json', 'utf-8'));

    const result = await collection.insertMany(data);

    console.log(`✅ Success! ${result.insertedCount} documents were inserted into the collection.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);