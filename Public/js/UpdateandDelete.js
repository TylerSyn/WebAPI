const DeleteGame = async(gamename) => {
    document.getElementById(`${gamename}`);
    try {
        const response = await fetch(`/deleteGame/${gamename}`,{method:'DELETE'});
        //const game = await response.json();
        console.log(gamename);

    } catch (error) {
        console.error("Error: ", error);
        //gameContainer.innerHTML = '<p style = "color:red">Failed to delete game</p>';
    }

}



