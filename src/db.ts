import mongoose, { Schema, Model } from "mongoose";
import { DBConnector } from "./DBConnector";
import { ItemManager } from "./ItemManager";

const dbconnector = new DBConnector();

async function main() {

    try {
        await dbconnector.connect();
    } catch (err) {
        console.log("Error", err);
    }
}

main();


const newItem = new ItemManager();

newItem.createItem('Item1', 'Description of Item1', 'Image path1')
    .then(() => {
        newItem.findItem("665f25ae2ac373438dee4240");
    })
    .then(() => {
        newItem.updateItem("665f25ae2ac373438dee4240", { name: "Pizza", description: "This is a pizza" });
    })

