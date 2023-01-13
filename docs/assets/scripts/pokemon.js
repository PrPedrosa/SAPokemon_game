export class Pokemon {
    constructor(ctx, pokemon, startPosX, startPosY, canvasW){
        this.ctx = ctx;
        this.startPosX = startPosX
        this.startPosY = startPosY
        this.pokemon = pokemon
        this.img = new Image()
        this.imgSrc = this.pokemon.img;
        this.canvasW = canvasW
        this.size = canvasW/15
        this.img.src = this.imgSrc
        this.forwardAnimationStartPos = this.startPosX + 20 //this num needs to change if we change frames condition on battleAnimation()
        this.forwardAnimationframes = 0
        
    }

    battleAnimationBackwards(isEnemy, frames){
        /* let ForwardAnimationStartPos = this.startPosX + frames*4 */
        if(!isEnemy){
            //clear poke image
            this.ctx.clearRect(
                Math.floor(this.startPosX /* -(this.size/30) */), 
                Math.floor(this.startPosY /* +1 */), 
                Math.floor(-this.size /* +4 */), 
                Math.floor(this.size /* -7 */)
            )
            //draw it again
            this.ctx.scale(-1,1)
            this.ctx.drawImage(
                this.img,
                Math.floor(-this.startPosX + frames),
                Math.floor(this.startPosY), 
                Math.floor(this.size),
                Math.floor(this.size)
            )
            this.ctx.scale(-1,1)
        } else {
            this.ctx.clearRect(
                Math.floor(this.startPosX /* + (this.size/30) */), 
                Math.floor(this.startPosY/*  + 1 */), 
                Math.floor(this.size /* - 4 */), 
                Math.floor(this.size /* - 7 */)
            )
            this.ctx.drawImage(
                this.img,
                Math.floor(this.startPosX + frames),
                Math.floor(this.startPosY), 
                Math.floor(this.size),
                Math.floor(this.size)
            )
        }

    }

    battleAnimationForwards(isEnemy, startPos, frames){
        if(!isEnemy){
            //clear poke image
            this.ctx.clearRect(
                Math.floor(this.startPosX /* -(this.size/30) */), 
                Math.floor(this.startPosY /* +1 */), 
                Math.floor(-this.size /* +4 */), 
                Math.floor(this.size /* -7 */)
            )
            //draw it again
            this.ctx.scale(-1,1)
            this.ctx.drawImage(
                this.img,
                Math.floor(-startPos + 40 - frames), //hardcoded num needs to change if we change frames condition on battleAnimation()
                Math.floor(this.startPosY), 
                Math.floor(this.size),
                Math.floor(this.size)
            )
            this.ctx.scale(-1,1)
        } else {
            this.ctx.clearRect(
                Math.floor(this.startPosX /* + (this.size/30) */), 
                Math.floor(this.startPosY/*  + 1 */), 
                Math.floor(this.size /* - 4 */), 
                Math.floor(this.size /* - 7 */)
            )
            this.ctx.drawImage(
                this.img,
                Math.floor(startPos - frames),
                Math.floor(this.startPosY), 
                Math.floor(this.size),
                Math.floor(this.size)
            )
        }
    }

    battleAnimation = (frames, isEnemy) => {
        if(frames > 20){
            this.battleAnimationForwards(isEnemy, this.forwardAnimationStartPos, this.forwardAnimationframes)
            this.forwardAnimationframes ++
        } else {
            this.battleAnimationBackwards(isEnemy, frames)       
        }
    }

    draw(distanceFromTeamMember = 0, isEnemy){

        if(!isEnemy){
            //this.img.src = this.imgSrc

            /* this.ctx.strokeRect( //black rect
                Math.floor(this.startPosX - (distanceFromTeamMember + this.size)), 
                Math.floor(this.startPosY), 
                Math.floor(this.size), 
                Math.floor(this.size)
            ) */
            /* this.img.onload = () => { */
                this.ctx.scale(-1,1) //turning sprites around
                this.ctx.drawImage( 
                    this.img,
                    Math.floor(-this.startPosX + distanceFromTeamMember),
                    Math.floor(this.startPosY), 
                    Math.floor(this.size),
                    Math.floor(this.size)
                )
                this.ctx.scale(-1,1) //resetting sprites
            /* } */
        }
        
        if(isEnemy){
            //this.img.src = this.imgSrc

           /*  this.ctx.strokeRect(
                Math.floor(this.startPosX + distanceFromTeamMember), 
                Math.floor(this.startPosY), 
                Math.floor(this.size), 
                Math.floor(this.size)
            ) */
            
           /*  this.img.onload = () => { */
                
                this.ctx.drawImage( 
                    this.img,
                    Math.floor(this.startPosX + distanceFromTeamMember),
                    Math.floor(this.startPosY),
                    Math.floor(this.size),
                    Math.floor(this.size)
                )
            /* } */
        }
    }

    drawStats(distanceFromTeamMember = 0){
        this.ctx.font = `${Math.floor(this.canvasW/80)}px sans-serif`
        this.ctx.textBaseline = "top"
        //DRAW ATT
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
            Math.floor(this.startPosX - distanceFromTeamMember - this.size + this.canvasW/150), //X
            Math.floor(this.startPosY + this.size -1 /* - this.canvasW/150 */), //Y
            Math.floor(this.canvasW/40), //size X
            Math.floor(this.canvasW/75) //size Y
        )
        this.ctx.fillStyle = "white"
        this.ctx.fillText(
            this.pokemon.stats.att, //stat number
            Math.floor(this.startPosX - distanceFromTeamMember - this.size + this.canvasW/115), //X
            Math.floor(this.startPosY + this.size +1 /* + this.canvasW/150 */) //Y
        )

        //DRAW HP
        this.ctx.fillStyle = "darkred";
        this.ctx.fillRect(
            Math.floor(this.startPosX - distanceFromTeamMember - this.canvasW/34), //X
            Math.floor(this.startPosY + this.size -1 /* - this.canvasW/150 */), //Y 
            Math.floor(this.canvasW/40), //size X
            Math.floor(this.canvasW/75) //size Y
        )
        this.ctx.textAlign = "right"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(
            this.pokemon.stats.hp, //stat number
            Math.floor(this.startPosX - distanceFromTeamMember - this.canvasW/115), //X
            Math.floor(this.startPosY + this.size +1 /* + this.canvasW/150 */) //Y
        )
        this.ctx.textAlign = "left"
    }
}