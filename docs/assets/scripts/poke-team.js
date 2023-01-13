import { Pokemon } from "./pokemon.js";
import { allPokemon } from "./db.js";
export class PokeTeam {
    constructor(ctx, canvasW, canvasH, isEnemy, startPosX, startPosY, generateFullTeam, team = []){
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.team = team
        this.startPosX = startPosX;
        this.startPosY = startPosY
        this.isEnemy = isEnemy;
        this.team.length === 0 ? this.generateRandomTeam(6) : null
        
    }

    generateRandomTeam(n){
        if(n > 6 || n <= 0) throw new Error("number of Pokemon must be between 0 and 6");
        
        const getRandomPoke = () => allPokemon[Math.floor(Math.random()*152)]

        for(let i = 0; i < n; i++){
            this.team.push(new Pokemon(this.ctx, getRandomPoke(), this.startPosX, this.startPosY, this.canvasW))
        }
    }

    draw(){
        this.team.forEach((poke, i) => {
            if(poke) {
                poke.draw((this.canvasW/15)*(+`${i}.${i}`), this.isEnemy)
            } else return
        })
        this.drawStats()
    }

    drawStats(){//draw stats checks for enemy cuz the draw method on pokemon.js is written differently
        this.team.forEach((poke, i) => {
            if(poke) {
                if(!this.isEnemy){
                    poke.drawStats((this.canvasW/15)*(+`${i}.${i}`))
                } else {
                    poke.drawStats((-this.canvasW/15)*(+`${i+1}.${i}`))
                }
            } else return
        })
    }
}