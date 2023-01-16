import { allPokemon } from "./db.js";
import { PokeTeam } from "./poke-team.js";
import { Pokemon } from "./pokemon.js";
export class Game {
    constructor(ctx, canvasW, canvasH){
        this.startTime;
        this.elapsedTime = 0;
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

        this.pokeArr = [...allPokemon]
        this.team = new PokeTeam(this.ctx, this.canvasW, this.canvasH, false, this.startPosX, this.startPosY, [
            new Pokemon(this.ctx, JSON.parse(JSON.stringify(this.pokeArr[5])), this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, JSON.parse(JSON.stringify(this.pokeArr[5])), this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, JSON.parse(JSON.stringify(this.pokeArr[5])), this.startPosX, this.startPosY, this.canvasW),
            new Pokemon(this.ctx, JSON.parse(JSON.stringify(this.pokeArr[5])), this.startPosX, this.startPosY, this.canvasW)
        ])
        this.enemyTeam = new PokeTeam(this.ctx, this.canvasW, this.canvasH, true, this.enemyStartPosX, this.enemyStartPosY)
        /* this.initialTeam = [...this.team.team]
        this.initialEnemyTeam = [...this.enemyTeam.team] */

        this.fightIterations = 0;
        this.enemyFightIterations = 0;


        this.animating = false
        this.fighting = false

        /* this.frontPoke = this.team.team[0].pokemon
        this.enemyFrontPoke = this.enemyTeam.team[0].pokemon */
    }

    wait(milliseconds){
        let start = new Date().getTime();
        let end = 0;
    
        while((end - start) < milliseconds){
            end = new Date().getTime();
            console.log("hello")
        }
        console.log("sup")
    }

    battleAnimation = () => {
        if(this.animating === true){
            this.team.team[0].battleAnimation(this.frames, false)
            this.enemyTeam.team[0].battleAnimation(this.frames, true)
        }
        if(this.frames % 60 === 0 && this.frames !== 0){
            this.animating = false
            this.fighting = true
            /* this.fight()
            this.frames = 0 */
        }
    }

    fight(){
        //downst work
        //const pokeArray = [...this.arr]


        const frontPoke = this.team.team[0].pokemon
        const enemyFrontPoke = this.enemyTeam.team[0].pokemon
        
        /* const basePoke = pokeArray.find(poke => poke.name === frontPoke.name)
        const baseEnemyPoke = pokeArray.find(poke => poke.name === enemyFrontPoke.name) */

       /*  const targetPokeHp = basePoke.stats.hp - enemyFrontPoke.stats.att
        const targetEnemyPokeHp = baseEnemyPoke.stats.hp - frontPoke.stats.att */
        //wait, att never changes so i dont need hp, only check for fight iterations on if statements
        //but on long run ill be changing db arr soooooo go to react mtfucker
        //still why dafuq [...arr] doesnt work cuz im copying th whole db intact without changing stats???????????????

        if(this.fightIterations < enemyFrontPoke.stats.att){
            frontPoke.stats.hp -= 1
            this.fightIterations++
        }
        if(this.enemyFightIterations < frontPoke.stats.att){
            enemyFrontPoke.stats.hp -= 1
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyFrontPoke.stats.att && this.enemyFightIterations === frontPoke.stats.att){
            if(enemyFrontPoke.stats.hp <= 0){
                this.enemyTeam.team.shift()
            }
            if(frontPoke.stats.hp <= 0){
                this.team.team.shift()
            }
            this.fightIterations = 0;
            this.enemyFightIterations = 0;
            this.fighting = false;
            this.animating = true
        }
    }

    middleLine(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasW/2, 0)
        this.ctx.lineTo(this.canvasW/2, this.canvasH);
        this.ctx.stroke()
        this.ctx.closePath();
    }

    update = (timestamp) => {
        if(this.team.team.length === 0 || this.enemyTeam.team.length === 0){
            cancelAnimationFrame(this.animationId)
        }
        if(this.startTime === undefined){
            this.startTime = timestamp
        }
        this.elapsedTime = +((timestamp - this.startTime)*0.001).toFixed(1) // time in seconds (0.0s)

        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        this.middleLine()
        
        this.team.draw()
        this.enemyTeam.draw()
        if(this.elapsedTime === 1){
            this.animating = true
        }
        if(this.elapsedTime > 1 && this.animating && this.team.team.length !== 0 && this.enemyTeam.team.length !== 0){
            this.frames ++
            this.battleAnimation()    
        }
        if(this.fighting){
            this.fight()
            if(this.frames){
                this.frames = 0
            }
        }
        
        this.animationId = requestAnimationFrame(this.update)
        if(this.frames === 1000){
            cancelAnimationFrame(this.animationId)
        }
    }

    start(){
        this.update();

    }



}