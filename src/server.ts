import { NextFunction, Request, Response } from "express";

const express = require("express");
const { DBConnector } = require("./DBConnector");
const { ItemManager } = require("./ItemManager");

const app = express();
const PORT = 3001;

app.use(express.json());

const dbconnector = new DBConnector();

// make a connection with DB
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await dbconnector.connect();
        next();
    } catch (err) {
        res.status(500).send(`Database connection error`);
    }
})

const itemManager = new ItemManager();

// create a new item
app.post('/create', async (req: Request, res: Response) => {
    const { name, description, imagePath } = req.body;
    try {
        await itemManager.createItem(name, description, imagePath);
        res.status(201).send("Item created successfully");
    } catch (err) {
        console.log(`Error in creating item`)
    }
})

// Get an item using id
app.get('/items', async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const item = await itemManager.findItem(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).send('Item not found with this id');
        }
    } catch (err) {
        res.status(500).send(`Error while fetching data ${err}`);
    }
});

// update data 
app.put('/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedItem = await itemManager.updateItem(id, updatedData);
        if (updatedItem) {
            res.status(200).send(`Data is updated : ${updatedItem}`);
        }
        else {
            res.status(404).send("Item not found");
        }
    } catch (err) {
        console.log("Error in updating data", err);
    }
})

// delete data
app.delete('/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedData = await itemManager.deleteItem(id);
        if (deletedData) {
            console.log("Item deleted successfully");
            res.status(200).send({ message: "Item deleted successfully" });
        }
        else {
            console.log("Item not found");
            res.status(404).send({ message: "Item not found" });
        }
    } catch (err) {
        console.error(`Error while deleting data`, err);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})