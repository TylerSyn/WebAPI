const gameContainer = document.getElementById("game-container");

const fetchGames = async()=>{
    try{
        const response = await fetch("/games");
        if(!response.ok){
            throw new Error("failed to get games");
        }

        //parse json
        const games = await response.json();
        console.log(games);

        //format the data to html
        gameContainer.innerHTML="";

        games.forEach((game) => {
            const gameDiv = document.createElement("div");
            gameDiv.className = "game";
            gameDiv.innerHTML = `${game.gameRank}. ${game.gameName}  <button id='game.id' type='button' onclick='window.location="/UpdateForm.html"'>Update</button> <button type='button' id = 'deleteBtn'>Delete</button>`;
            gameContainer.appendChild(gameDiv);
        });

    }catch(error){
        console.error("Error: ",error);
        gameContainer.innerHTML = "<p style = 'color:red'>Failed to get games</p>";
    }
}


fetchGames();

