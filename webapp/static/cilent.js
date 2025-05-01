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
    const body = document.getElementById("body");
    body.innerHTML = `
        <p>Your Cards: ${data.player.join(", ")}</p>
        <p>Dealer Cards: ${data.dealer.join(", ")}</p>
        ${data.status === "playing" ? `
            <button onclick="hit()" class="btn btn-primary">Hit</button>
            <button onclick="stand()" class="btn btn-secondary">Stand</button>
        ` : `
            <h2>${data.result}</h2>
            <button onclick="startGame()" class="btn btn-success mt-3">Play Again</button>
        `}
    `;
}


window.onload = startGame;
