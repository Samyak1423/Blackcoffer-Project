const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Your MongoDB Connection String
const uri = process.env.MONGO_URI || "mongodb+srv://Samyak:14Nov2004@cluster0.lkf930r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(uri);
  

// Main function to connect to the DB and define API routes
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        // Define the database and collection
        const database = client.db('blackcoffer_dashboard');
        const insightsCollection = database.collection('insights');

        // --- NEW: API ENDPOINT FOR FILTERS ---
        
        app.get('/api/filters', async (req, res) => {
            try {
                const topics = await insightsCollection.distinct('topic');
                const sectors = await insightsCollection.distinct('sector');
                const regions = await insightsCollection.distinct('region');
                const pests = await insightsCollection.distinct('pestle');
                const sources = await insightsCollection.distinct('source');
                const countries = await insightsCollection.distinct('country');
                const cities = await insightsCollection.distinct('city');
                const endYears = await insightsCollection.distinct('end_year');
                const startYears = await insightsCollection.distinct('start_year');
                
                res.json({
                    topics: topics.filter(item => item).sort(),
                    sectors: sectors.filter(item => item).sort(),
                    regions: regions.filter(item => item).sort(),
                    pests: pests.filter(item => item).sort(),
                    sources: sources.filter(item => item).sort(),
                    countries: countries.filter(item => item).sort(),
                    cities: cities.filter(item => item).sort(),
                    endYears: endYears.filter(item => item).sort((a, b) => b - a),
                    startYears: startYears.filter(item => item).sort((a, b) => b - a)

                });
            } catch (error) {
                res.status(500).send({ message: 'Error fetching filter options', error });
            }
        });

        // --- NEW: API ENDPOINT FOR DATA ---
      
        app.get('/api/data', async (req, res) => {
            try {
                const query = {};
                
                // Dynamically build the query object from request parameters
                if (req.query.topic) query.topic = req.query.topic;
                if (req.query.sector) query.sector = req.query.sector;
                if (req.query.region) query.region = req.query.region;
                if (req.query.pestle) query.pestle = req.query.pestle;
                if (req.query.source) query.source = req.query.source;
                if (req.query.country) query.country = req.query.country;
                if (req.query.city) query.city = req.query.city;
                if (req.query.end_year) query.end_year = parseInt(req.query.end_year);
                
                const data = await insightsCollection.find(query).toArray();
                res.json(data);
            } catch (error) {
                res.status(500).send({ message: 'Error fetching data', error });
            }
        });

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}
run().catch(console.dir);

// Root URL route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello from the Blackcoffer API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});