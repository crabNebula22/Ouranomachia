export const Ouranomachia = {
    setup: () => ({cells: Array(12).fill(null)}),

    moves: {

        //Player first selects a specific planet
        clickPlanet: ({G, playerID}, planet) => {
            G.planets[planet] = playerID;
        },
        //When player has selected a piece, they then select a cell
        clickCell: ({G, playerID}, id) => {
            G.cells[id] = playerID;
        },
        //Would be nice to give the player the option to confirm move.
    }
}