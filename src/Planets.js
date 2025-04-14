import {
    Aries,
    Cancer,
    Leo,
    Virgo,
    Libra,
    Sagittarius,
    Capricorn
 } from './Signs';

function createPiece(name, playerID, iconCharCode, index, position) {
    return {
        name: name,
        playerID: playerID,
        iconCharCode: iconCharCode,
        index: index,
        position: position,
        power: 0,
        clockwise: true,
        moves: [0,0],
        moveCount: 0
    };
}

export const Sun0 = createPiece("Sun", 0, "\u2609", 0, Leo.index * 30 + 16);
export const Moon0 = createPiece("Moon", 0, "\u263E", 1, Cancer.index * 30 + 18);
export const Mercury0 = createPiece("Mercury", 0, "\u263F", 2, Virgo.index * 30 + 4);
export const Venus0 = createPiece("Venus", 0, "\u2640", 3, Libra.index * 30 + 3);
export const Mars0 = createPiece("Mars", 0, "\u2642", 4, Aries.index * 30 + 26);
export const Saturn0 = createPiece("Saturn", 0, "\u2644", 5, Capricorn.index * 30 + 20);
export const Jupiter0 = createPiece("Jupiter", 0, "\u2643", 6, Sagittarius.index * 30 + 24);
// Player 2's Signs are offset by 180 degrees
export const Sun1 = createPiece("Sun", 1, "\u2609", 0, (Leo.index * 30 + 16 + 180) % 360);
export const Moon1 = createPiece("Moon", 1, "\u263E", 1, (Cancer.index * 30 + 18 + 180) % 360);
export const Mercury1 = createPiece("Mercury", 1, "\u263F", 2, (Virgo.index * 30 + 4 + 180) % 360);
export const Venus1 = createPiece("Venus", 1, "\u2640", 3, (Libra.index * 30 + 3 + 180) % 360);
export const Mars1 = createPiece("Mars", 1, "\u2642", 4, (Aries.index * 30 + 26 + 180) % 360);
export const Saturn1 = createPiece("Saturn", 1, "\u2644", 5, (Capricorn.index * 30 + 20 + 180) % 360);
export const Jupiter1 = createPiece("Jupiter", 1, "\u2643", 6, (Sagittarius.index * 30 + 24 + 180) % 360);