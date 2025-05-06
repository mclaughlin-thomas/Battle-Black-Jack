let gameId;

async function startGame() {
    const res = await fetch("/blackjack/start", { method: "POST" });
    const data = await res.json();
    gameId = data.gameId;
    document.getElementById("msg").innerText = "Game started!";
    updateGame(data);
}

async function hit() {
    const res = await fetch("/blackjack/hit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId })
    });
    const data = await res.json();
    updateGame(data);
}

async function stand() {
    const res = await fetch("/blackjack/stand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId })
    });
    const data = await res.json();
    updateGame(data);
}

function updateGame(data) {
    // https://www.geeksforgeeks.org/javascript-innerhtml/#
    // https://www.w3schools.com/js/js_htmldom_html.asp
    
    const body = document.getElementById("body");

    // Helper to pull card images
    function renderCards(cards) {
        return cards.map(value => {
            // Trim and remove any spaces
            value = value.trim();
            return `<img src="cards/${value}.jpg" alt="${value}" style="width:80px; margin:5px;">`;
        }).join("");
    }

    body.innerHTML = `
        <div>
            <h3>Your Cards:</h3>
            ${renderCards(data.player)}
        </div>
        <div class="mt-3">
            <h3>Dealer Cards:</h3>
            ${renderCards(data.dealer)}
        </div>
        <div class="mt-4">
            ${data.status === "playing" ? `
                <button onclick="hit()" class="btn btn-primary">Hit</button>
                <button onclick="stand()" class="btn btn-secondary">Stand</button>
            ` : `
                <h2>${data.result}</h2>
                <button onclick="startGame()" class="btn btn-success mt-3">Play Again</button>
            `}
        </div>
    `;
}


// https://stackoverflow.com/questions/588040/window-onload-vs-document-onload
window.onload = startGame;
