export const Ouranomachia = {
    setup: () => ({cells: Array(12).fill(null)}),

    moves: {
        
        //another move would be to select a specific planet

        clickCell: ({G, playerID}, id) => {
            G.cells[id] = playerID;
        }
    }
}