const express = require("express");
const cors = require("cors");
const app = express();
const DBconnect = require("./config/DBconnect");
const Data = require("./model/Data");

DBconnect();

app.use(express.json());
app.use(cors({ origin: '*' }));


app.get("/api", async (req, res) => {
    try {
        const response = await Data.find();
        res.status(200).json(response);
    } catch (error) {
        console.log("error in fetching data");
    }
});

app.post("/api", async (req, res) => {
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();

        console.log('Data posted:', savedData);
        res.status(201).json(savedData);
    } catch (error) {
        console.error("Error in posting data:", error);
        res.status(500).json({ error: "Failed to post data", details: error.message });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

