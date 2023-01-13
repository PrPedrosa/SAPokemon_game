import { allPokemon } from "./db.js";
import { PokeTeam } from "./poke-team.js";
import { Pokemon } from "./pokemon.js";
export class Game {
    constructor(ctx, canvasW, canvasH){
        this.animationId;
        this.frames = 0;
        this.ctx = ctx;       
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        //starting positions for the teams in canvas
        this.startPosX = this.canvasW/2 -10
        this.startPosY = this.canvasH/2 - this.canvasW/15
        this.enemyStartPosX = this.canvasW/2 +10
        this.enemyStartPosY = this.canvasH/2 - this.canvasW/15

        this.team = new PokeTeam(this.ctx, this.canvasW, this.canvasH, false, this.startPosX, this.startPosY, false, [
            new Pokemon(this.ctx, allPokemon[5], this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, allPokemon[1], this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, allPokemon[2], this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, allPokemon[3], this.startPosX, this.startPosY, this.canvasW)
        ])
        this.enemyTeam = new PokeTeam(this.ctx, this.canvasW, this.canvasH, true, this.enemyStartPosX, this.enemyStartPosY, true)
        this.initialTeam = [...this.team.team]
        this.frontPokes = [this.team.team[0], this.enemyTeam.team[0]]
    }

    battleAnimation(){
        this.team.team[0].battleAnimation(this.frames, false)
        
        this.enemyTeam.team[0].battleAnimation(this.frames, true)
        if(this.frames % 40 === 0 && this.frames !== 0){
            this.fight()
            this.frames = 0
        }
    
    }

    fight = () => {        
        const frontPoke = this.team.team[0].pokemon
        const enemyFrontPoke = this.enemyTeam.team[0].pokemon

        frontPoke.stats.hp -= enemyFrontPoke.stats.att;
        enemyFrontPoke.stats.hp -= frontPoke.stats.att;  
        if(frontPoke.stats.hp <= 0) {
            this.team.team.shift()
        }
        if(enemyFrontPoke.stats.hp <= 0){
            this.enemyTeam.team.shift()
        }      
    }

    middleLine(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasW/2, 0)
        this.ctx.lineTo(this.canvasW/2, this.canvasH);
        this.ctx.stroke()
        this.ctx.closePath();
    }

    update = () => {
        this.animationId = requestAnimationFrame(this.update)
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        this.middleLine()

        this.team.draw()
        this.enemyTeam.draw()
        //this.fight()
        this.battleAnimation()

        this.frames ++
        if(this.frames === 1000){
            cancelAnimationFrame(this.animationId)
        }
    }

    start(){
        this.update();
    }



}