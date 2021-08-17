const fetch = require('node-fetch');
const JOKES = 'https://api.chucknorris.io/jokes/random';
const QUOTES = 'https://api.kanye.rest/';
const URI = "mongodb+srv://shai:tcdsv123@cluster0.dvwyv.mongodb.net/surpriseme?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const client = new MongoClient(URI);

// Get a surprise
exports.getSurprise = async (req, res, next) => {

    const name = await req.query.name;
    const birth_year = await req.query.birth_year;

    let val;

    const rndInt = Math.floor(Math.random() * 2) + 1;

    if (name == undefined){
        res.status(400).json({
            "exit code 400": 'You did not give a name.'
        });
    } else if (birth_year == undefined){
        res.status(400).json({
            "exit code 400": 'You did not give a birth year.'
        });
    } else {
        if (birth_year <= 2000){
            if (name[0] != 'Q'){
                if (rndInt == 1){
                    (async () => {
                        try {
                            const response = await fetch(JOKES);
                            const json = await response.json();
                            val = json.value;
                            res.status(200).json({
                                type: "chuck-norris-joke",
                                result: val
                            });
                        } catch (error) {
                          console.log(error.response.body);
                        }
                      })();
                      update("chuck-norris-joke");
                } else if (rndInt == 2){
                    let sum = nameSum(name);
                    res.status(200).json({
                        type: "name-sum",
                        result: sum
                    });
                    update("name-sum");
                }
            } else {
                (async () => {
                    try {
                        const response = await fetch(JOKES);
                        const json = await response.json();
                        val = json.value;
                        res.status(200).json({
                            type: "chuck-norris-joke",
                            result: val
                        });
                    } catch (error) {
                      console.log(error.response.body);
                    }
                  })();
                  update("chuck-norris-joke");
            }
        } else if (name[0] != 'A' & name[0] != 'Z'){
            if (name[0] != 'Q'){
                if (rndInt == 1){
                    (async () => {
                        try {
                            const response = await fetch(QUOTES);
                            const json = await response.json();
                            val = json.quote;
                            res.status(200).json({
                                type: "kanye-quote",
                                result: val
                            });
                        } catch (error) {
                          console.log(error.response.body);
                        }
                      })();
                      update("kanye-quote");
                } else if (rndInt == 2){
                    let sum = nameSum(name);
                    res.status(200).json({
                        type: "name-sum",
                        result: sum
                    });
                    update("name-sum");
                }
            } else {
                (async () => {
                    try {
                        const response = await fetch(QUOTES);
                        const json = await response.json();
                        val = json.quote;
                        res.status(200).json({
                            type: "kanye-quote",
                            result: val
                        });
                    } catch (error) {
                      console.log(error.response.body);
                    }
                  })();
                  update("kanye-quote");
            }
        } else {
            let sum = nameSum(name);
            res.status(200).json({
                type: "name-sum",
                result: sum
            });
            update("name-sum");
        }
    }
}

function nameSum(name){
    const dict = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8, 'I':9, 'J':10, 'K':11, 'L':12, 'M':13, 'N':14, 'O':15,
                    'P':16, 'Q':17, 'R':18, 'S':19, 'T':20, 'U':21, 'V':22, 'W':23, 'X':24, 'Y':25, 'Z':26, 'a':1, 'b':2, 'c':3,
                    'd':4, 'e':5, 'f':6, 'g':7, 'h':8, 'i':9, 'j':10, 'k':11, 'l':12, 'm':13, 'n':14, 'o':15, 'p':16, 'q':17, 'r':18,
                    's':19, 't':20, 'u':21, 'v':22, 'w':23, 'x':24, 'y':25, 'z':26, ' ':0};
    let sum = 0;
    for(i = 0; i < name.length; i++){
        sum += dict[name[i]];
    }
    return sum;
}

async function update(type) {
	try {
        await client.connect();
    	const database = client.db("SurpriseMe");
        const collection = database.collection("surprises");
        const doc = {type: type};
        const result = await collection.insertOne(doc);
    } finally {
        await client.close();
    }
}