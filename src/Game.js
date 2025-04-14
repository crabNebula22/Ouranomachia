
// Ouranomachia - Ludus Astronommorum 
import { INVALID_MOVE } from 'boardgame.io/core';
import { 
    Sun0,
    Moon0,
    Mercury0,
    Venus0,
    Mars0,
    Saturn0,
    Jupiter0,
    Sun1,
    Moon1,
    Mercury1,
    Venus1,
    Mars1,
    Saturn1,
    Jupiter1
 } from './Planets';
 import {
    Aries,
    Taurus,
    Gemini,
    Cancer,
    Leo,
    Virgo,
    Libra,
    Scorpio,
    Sagittarius,
    Capricorn,
    Aquarius,
    Pisces
 } from './Signs';

export const Ouranomachia = {
    // The name of the game.
    name: 'Ouranomachia',

    // Function that returns the initial value of G.
    // setupData is an optional custom object that is
    // passed through the Game Creation API.
    // setup: ({ ctx, ...plugins }, setupData) => G,
    setup: () => ({ 
        playerColor: ['red','blue'],
        playerPlanets: [[Sun0,Moon0,Jupiter0,Saturn0,Mars0,Venus0,Mercury0],
                        [Sun1,Moon1,Jupiter1,Saturn1,Mars1,Venus1,Mercury1]],
        signs: [Aries,Taurus,Gemini,Cancer,Leo,Virgo,Libra,Scorpio,Sagittarius,Capricorn,Aquarius,Pisces],
        selectedPlanet: null
    }),
  
    // These are functions that tell the framework how to change G 
    // when a particular game move is made. They must not depend on 
    // external state or have any side-effects (except modifying G).
    moves: {
      // short-form move.
      // A: ({ G, ctx, playerID, events, random, ...plugins }, ...args) => {},
      // There is also a long form where you define the move along with a number of flags.

      selectPlanet: ({ G, ctx, playerID }, planetIndex) => {
        let playerIndex = Number(playerID);
        let planet = G.playerPlanets[playerIndex][planetIndex];
        G.selectedPlanet =  planet;
        // Calculate available moves
        calculateMoves(planet,playerIndex);
        // Calculate power
      },
      movePlanet: ({ G, ctx, playerID }, clockwise) => {
        let playerIndex = Number(playerID);
        let planet = G.playerPlanets[playerIndex][G.selectedPlanet.index];
        G.selectedPlanet = null;
        if (clockwise) {
          // If the move is the same as the current position
          if (planet.position == planet.moves[0]) {
            // it is an invalid move
            return INVALID_MOVE;
          }
          planet.position = planet.moves[0];
        }
        else {
          // If the move is the same as the current position
          if (planet.position == planet.moves[1]) {
            // it is an invalid move
            return INVALID_MOVE;
          }
          planet.position = planet.moves[1];
        }
      }
    },
  };

function calculateMoves(planet,playerIndex) {
  let degrees = 1;
  const sun_position = playerPlanets[playerIndex][0];
  if (planet.name === "Sun") {
    // May only move one degree forward
    planet.moves = [planet.position + degrees, planet.position]; 
  }

  else if (planet.name === "Moon") {
    // Follows a fixed pattern of moving forward 13 degrees
    // twenty-two times, then fourteen degrees five times
    if (planet.moveCount % 27 > 22) {
      degrees = 14;
    }
    else {
      degrees = 13;
    }
    planet.moves = [planet.position + degrees, planet.position]; 
  }

  else if (planet.name === "Saturn") {
    // May either move forward or backward by a half degree. 
    // It can not be more than 110 degrees from the sun in 
    // any direction. If it somehow exceeds this range then 
    // it is forced to use the movement to return within range.
    degrees = 0.5;
    const sun = playerPlanets[playerIndex][0];
    let dist1 = sun.posistion - planet.posistion;
    let dist2 = planet.posistion - sun.posistion;
    let clockwise = dist1 >= 0;
    let inBounds = (dist1 + 360) % 360 <= 110 || (dist2 + 360) % 360 <= 110;
    if (inBounds) {
      planet.moves = [planet.position + degrees, planet.position - degrees]; 
    }
    else {
      // Only valid movement is shortest path to the Sun
      if (clockwise) {
        planet.moves = [planet.position + degrees, planet.position]; 
      }
      else {
        planet.moves = [planet.position, planet.position - degrees]; 
      }
    }
  }
  
  else if (planet.name === "Jupiter") {
    // May either move forward or backward by a half degree. 
    // It can not be more than 120 degrees from the sun in any direction. 
    // If it somehow exceeds this range then it is forced to use the movement to return within range.
    degrees = .5;
    const sun_position = playerPlanets[playerIndex][0];
    let retrograde = sun_position - planet.posistion;
    let forward = planet.posistion - sun_position;
    let in_range_of_sun = (retrograde + 360) % 360 >= 110 || 110 >= (forward + 360) % 360;
    if (in_range_of_sun){
      if (planet.posistion > sun_position) {
        planet.moves = [planet.postion - degrees];
      }
      else {
        planet.moves = [planet.positon + degrees];
      }
    }
    else {
      planet.moves = [planet.posistion - degrees, planet.posistion + degrees];
    }
    
  }
  else if (planet.name === "Mars") {
    // May move forward by one degree or backward by a half degree.  
    // It can not be more than 130 degrees from the sun. 
    // If it somehow exceeds this range then it is forced to use the movement to return within range.
    if (planet.clockwise) {
      degrees = 1;
    }
    else {
      degrees = .5;
    }
    //let sun_ahead_of_mars = 
    //let mars_ahead_of_sun =  
  }
  
  else if (planet.name === "Venus") {
    // Must move forward by a half degree. 
    // When the range of 47 is reached, it is forced to move backward by one and a half degrees until it is.
    // Venus also moves one degree forward when the sun moves.
    // Range of 47 degree from sun forward and back, returned within range if somehow moved outside. 
    // Probably a backward motion so 1 and half degree
    degrees = .5;

  }

  else if (planet.name === "Mercury") {
    // Must move forward by 1 degree until it reaches its limit of 
    // 27 degrees from the sun. Then moves backwards by 2 degrees 
    // until it is 27 degrees behind the sun.
    if (planet.clockwise) {
      degrees = 1;
    }
    else {
      degrees = 2;
    }
  }
}