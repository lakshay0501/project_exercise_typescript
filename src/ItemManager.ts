import mongoose, { Model, Schema } from "mongoose";

export interface IItem {
    name: string,
    description: string,
    imagePath: string,
}

const itemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true }
})

export const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);

export class ItemManager {

    public async createItem(name: string, description: string, imagePath: string) {
        try {
            const newItem = new Item({ name, description, imagePath });
            await newItem.save();
            console.log("Item is created ", newItem);
        } catch (err) {
            console.log("Error while creating item", err);
        }
    }

    public async deleteItem(id: string) {
        try {
            const tobeDeletedItem = await Item.findByIdAndDelete(id);
            if (tobeDeletedItem) {
                console.log("Item is successfully deleted", tobeDeletedItem);
            }
        } catch (err) {
            console.log("Error while deleting Item", err);
        }
    }

    public async updateItem(id: string, updatedData: Partial<IItem>) {
        try {
            const tobeUpdatedItem = await Item.findByIdAndUpdate(id, updatedData);
            if (tobeUpdatedItem) {
                console.log("Item successfully updated", tobeUpdatedItem);
            }
            else {
                console.log("Item not found");
            }
        } catch (err) {
            console.log("Error while updating Item");
        }
    }

    public async findItem(id: string) {
        try {
            const item = await Item.findById(id);
            if (item) {
                console.log("Item found", item);
            }
            else {
                console.log("Item not found");
            }
        } catch (err) {
            console.log("Item not found", err);
        }
    }
}
