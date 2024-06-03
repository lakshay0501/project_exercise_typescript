interface Item {
    name: string,
    description: string,
    imagePath: string
}

interface Filter {
    filter(searchText: string): Promise<Item[]>
}

const filter = fetchData();
onSearchClick();


function createCard(item: Item): HTMLDivElement {
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

async function onSearchClick(): Promise<void> {
    const searchText = getInputValue("inputbox").toLowerCase();
    let container = document.getElementById("content");
    if (container) {
        const filteredData = await filter.filter(searchText);
        displayItems(container, filteredData, createCard);
    }
}

function displayItems(container: HTMLElement, items: Item[], cardFactory: (item: Item) => HTMLDivElement) {
    clearDOM(container);
    items.forEach(item => {
        const card = cardFactory(item);
        container.appendChild(card);
    });
}

function clearDOM(container: HTMLElement) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function getInputValue(itemId: string): string {
    const inputElement = document.getElementById(itemId) as HTMLInputElement;
    return inputElement.value
}

function fetchData(): Filter {
    let data: Item[] | null;

    return {
        async filter(searchText) {
            if (!data) {
                const response = await fetch("https://pbivizedit.com/api/visuals");
                const json = await response.json();
                data = json.items;
            }
            return (data ?? []).filter(item => item.name?.toLowerCase().includes(searchText ?? ""));
        }
    }
}