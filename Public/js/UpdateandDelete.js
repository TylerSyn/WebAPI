const DeleteGame = async(gamename) => {
    document.getElementById(`${gamename}`);
    try {
        const response = await fetch(`/deleteGame/${gamename}`,{method:'DELETE'});
        //const game = await response.json();
        console.log(gamename);

        location.reload(true);

    } catch (error) {
        console.error("Error: ", error);
        //gameContainer.innerHTML = '<p style = "color:red">Failed to delete game</p>';
    }

}
const UpdateGame = async(gameRank)=>{
    try{
        const response = await fetch(`/updateGame/${gameRank}`);
        console.log(gameRank);
        response.redirected("Index.html");
    }catch(error){
        console.error("Error: ",error);
    }
}


