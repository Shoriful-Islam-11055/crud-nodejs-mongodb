const express = require("express");
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require("mongodb");
const objectId = require('mongodb').objectId;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//db-user: bduser1
//db-password: gyiqybnFTLjXMX7U

const uri =
  "mongodb+srv://bduser1:gyiqybnFTLjXMX7U@cluster0.rc27j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    //database connection
    const userCollection = client.db("goodsExpress").collection("users");
    
    //send data for API Show
    app.get("/user", async(req, res)=>{
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    })

    //post data in backend database
    app.post("/user", async(req, res) => {
      const newUser = req.body;
      console.log(newUser);
      //insert data in database
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //delete a user
    app.delete('/user/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

  } finally {
    //await clint.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello everyone, I am Alive");
});


app.listen(port, () => {
  console.log("I am running");
});
