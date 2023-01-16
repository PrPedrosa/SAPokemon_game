/**@type {HTMLCanvasElement} */
import { PokeTeam } from "./poke-team.js";
import { Game } from "./game.js"

window.addEventListener("load", function() {

    const canvas = document.getElementById("canvas");
    let fightBtn = document.getElementById("fightBtn");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let canvasW = canvas.width
    let canvasH = canvas.height
    
    //line in middle
    ctx.beginPath();
    ctx.moveTo(canvasW/2, 0)
    ctx.lineTo(canvasW/2, canvasH);
    ctx.stroke()
    ctx.closePath();
    
    const game = new Game(ctx, canvasW, canvasH);
    console.log(game)
    fightBtn.addEventListener("click", () => {
        game.start();
    })


    
    
    
    /* function dragMechanic (){
        let isDragging = false
      canvas.addEventListener("mousedown", e => {
        
        if(e.offsetX < canvasW/15 &&  e.offsetY < canvasW/15) {
        poke1X = +e.offsetX;
        poke1Y = +e.offsetY;
        isDragging = true;
        }
        console.log(isDragging)
    })
      canvas.addEventListener("mousemove", e => {
    
        poke1X = +e.offsetX;
        poke1Y = +e.offsetY;
        if(isDragging){
            ctx.clearRect(0, 0, canvasW, canvasH)
            charmander.draw(canvasW, poke1X - canvasW/30, poke1Y - canvasW/30)
        }
    })
      canvas.addEventListener("mouseup", e => {
        if(isDragging){
            isDragging = false
            ctx.clearRect(0,0,canvasW,canvasH)
            x = 0;
            y = 0;
            charmander.draw(canvasW)
        }
    })
    } */
    //dragMechanic()
})





//TO CALL API

/* const btn = document.getElementById("countBtn")
const list = document.getElementById("pokeList")

btn.addEventListener("click", () => {
    apiCallPKMN()
})


let count = 1
const apiCallPKMN = async () =>  {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
    const pokemon = await response.json()
    console.log(count)
    btn.innerHTML = `count is ${count}`
    count ++
   

   const goodPokemon = {
    name : pokemon.name,
    img: pokemon.sprites.front_default,
    stats : {
        hp : pokemon.stats[0].base_stat,
        att : pokemon.stats[1].base_stat,
        def : pokemon.stats[2].base_stat,
        spAtt : pokemon.stats[3].base_stat,
        spDef : pokemon.stats[4].base_stat,
        speed : pokemon.stats[5].base_stat,
    },
    types : [

    ],
    ability: pokemon.abilities[0].ability.name,
   }

   for(let i = 0; i < pokemon.types.length; i++){
    goodPokemon.types.push(pokemon.types[i].type.name)
   }

   allPokemon.push(goodPokemon);
   if (goodPokemon.types.length === 1){
       list.innerHTML += `
       {"name" : "${pokemon.name}",<br>
        "img": "${pokemon.sprites.front_default}",<br>
        "stats" : {<br>
            "hp" : ${pokemon.stats[0].base_stat},<br>
            "att" : ${pokemon.stats[1].base_stat},<br>
            "def" : ${pokemon.stats[2].base_stat},<br>
            "spAtt" : ${pokemon.stats[3].base_stat},<br>
            "spDef" : ${pokemon.stats[4].base_stat},<br>
            "speed" : ${pokemon.stats[5].base_stat},<br>
        },<br>
        "types" : [<br>
            "${pokemon.types[0].type.name}",<br>
        ],<br>
        "ability": "${pokemon.abilities[0].ability.name}",<br>
        },<br>`
   } else {
    list.innerHTML += `
    {"name" : "${pokemon.name}",<br>
     "img": "${pokemon.sprites.front_default}",<br>
     "stats" : {<br>
         "hp" : ${pokemon.stats[0].base_stat},<br>
         "att" : ${pokemon.stats[1].base_stat},<br>
         "def" : ${pokemon.stats[2].base_stat},<br>
         "spAtt" : ${pokemon.stats[3].base_stat},<br>
         "spDef" : ${pokemon.stats[4].base_stat},<br>
         "speed" : ${pokemon.stats[5].base_stat},<br>
     },<br>
     "types" : [<br>
         "${pokemon.types[0].type.name}",<br>
         "${pokemon.types[1].type.name}",<br>
     ],<br>
     "ability": "${pokemon.abilities[0].ability.name}",<br>
     },<br>`
   }
   console.log(allPokemon);
   
} */




