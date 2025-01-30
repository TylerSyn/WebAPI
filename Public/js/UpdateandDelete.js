const DeleteGame = async(gamename) => {
    document.getElementById(`${gamename}Dlt`);
    try {
        const response = await fetch(`/deleteGame/${gamename}`);
         if (!response.ok) {
             throw new Error("failed to get game");
         }

        const game = await response.json();
        console.log(gamename);


    } catch (error) {
        console.error("Error: ", error);
        gameContainer.innerHTML = "<p style = 'color:red'>Failed to delete game</p>";
    }

}



