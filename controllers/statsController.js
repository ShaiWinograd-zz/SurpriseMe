const URI = "mongodb+srv://shai:tcdsv123@cluster0.dvwyv.mongodb.net/surpriseme?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const client = new MongoClient(URI);

// Get stats
exports.getStats = async (req, res, next) => {
    const numOfCalls = await getNumOfCalls();
    const numOfJokes = await getNumOfSurprises("chuck-norris-joke");
    const numOfQuotes = await getNumOfSurprises("kanye-quote");
    const numOfSums = await getNumOfSurprises("name-sum");
    if(numOfCalls == 0){
        res.status(200).json({
            requests: 0,
            distribution: []
        })
    } else {
        let distribution = [];
        if(numOfJokes != 0){
            distribution.push({type: "chuck-norris-joke", count: numOfJokes}); 
        }
        if(numOfQuotes != 0){
            distribution.push({type: "kanye-quote", count: numOfQuotes}); 
        }
        if(numOfSums != 0){
            distribution.push({type: "name-sum", count: numOfSums}); 
        }
        res.status(200).json({
            requests: numOfCalls,
            distribution: distribution
        });
    }
}

async function getNumOfCalls() {
    try {
      await client.connect();
      const database = client.db("SurpriseMe");
      const collection = database.collection("surprises");
      const count = await collection.estimatedDocumentCount();
      return count;
    } finally {
      await client.close();
    }
}

async function getNumOfSurprises(surprise) {
    try {
      await client.connect();
      const database = client.db("SurpriseMe");
      const collection = database.collection("surprises");
      const query = {type: surprise};
      const count = await collection.countDocuments(query);
      return count;
    } finally {
      await client.close();
    }
}
