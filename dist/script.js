"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DataFetch {
    constructor() {
        this.data = null;
    }
    filter(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.data) {
                yield this.fetchData();
            }
            return ((_a = this.data) !== null && _a !== void 0 ? _a : []).filter(item => { var _a; return (_a = item.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchText !== null && searchText !== void 0 ? searchText : ""); });
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://pbivizedit.com/api/visuals");
            const json = yield response.json();
            this.data = json.items;
        });
    }
}
const filter = new DataFetch();
onSearchClick();
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    const cardTitle = document.createElement("h3");
    cardTitle.textContent = item.name;
    const cardDescription = document.createElement("p");
    cardDescription.textContent = item.description;
    const cardImage = document.createElement("img");
    cardImage.src = item.imagePath;
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    return card;
}
function onSearchClick() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchText = getInputValue("inputbox").toLowerCase();
        let container = document.getElementById("content");
        if (container) {
            const filteredData = yield filter.filter(searchText);
            displayItems(container, filteredData, createCard);
        }
    });
}
function displayItems(container, items, cardFactory) {
    clearDOM(container);
    items.forEach(item => {
        const card = cardFactory(item);
        container.appendChild(card);
    });
}
function clearDOM(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function getInputValue(itemId) {
    const inputElement = document.getElementById(itemId);
    return inputElement.value;
}
function fetchData() {
    // let data: Item[] | null;
    // return {
    //     async filter(searchText) {
    //         if (!data) {
    //             const response = await fetch("https://pbivizedit.com/api/visuals");
    //             const json = await response.json();
    //             data = json.items;
    //         }
    //         return (data ?? []).filter(item => item.name?.toLowerCase().includes(searchText ?? ""));
    //     }
    // }
    return new DataFetch();
}
