

const DeleteGame = async(gamename) => {
    try {
        const response = await fetch(`/deleteGame/${gamename}`);
        if (!response.ok) {
            throw new Error("failed to get game");
        }

        const game = await response.json();
    } catch (error) {
        console.error("Error: ", error);
        gameContainer.innerHTML = "<p style = 'color:red'>Failed to get games</p>";
    }

}
const deleteBtn = document.getElementById("deleteBtn").onclick = DeleteGame(deleteBtn.gamename)


