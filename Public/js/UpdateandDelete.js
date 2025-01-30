

const DeleteGame = async(gamename) => {
    try {
        const response = (`/deleteGame/${gamename}`);
        if (!response.ok) {
            throw new Error("failed to get game");
        }

        const game = await response.json();
        console.log(game);


    } catch (error) {
        console.error("Error: ", error);
        gameContainer.innerHTML = "<p style = 'color:red'>Failed to delete game</p>";
    }

}
const deleteBtn = document.getElementById("deleteBtn").onclick = DeleteGame(deleteBtn.gamename)


