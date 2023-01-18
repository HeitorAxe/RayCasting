let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

const mouse = {
    x:window.innerWidth/2,
    y:0+window.innerHeight/2,
    down: false
}

let visionAngle = 0;

window.addEventListener("mousedown", function(e){
    mouse.down = true;
})

window.addEventListener("mouseup", function(e){
    mouse.down = false;
})


window.addEventListener("mousemove", function(e){
    if(mouse.down){
        mouse.x = e.x;
        mouse.y = e.y;
    }
});


window.addEventListener("keydown", function(e){
    if(e.code == "KeyA")
    {
        visionAngle+=5;
    }

    if(e.code == "KeyD")
    {
        visionAngle-=5;
    }

    if(e.code == "ArrowUp")
    {
        mouse.y-=10;
    }
    if(e.code == "ArrowDown")
    {
        mouse.y+=10;
    }
    if(e.code == "ArrowLeft")
    {
        mouse.x-=10;
    }
    if(e.code == "ArrowRight")
    {
        mouse.x+=10;
    }
    console.log(e);
});


var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

window.onload = function() {
    canvas2 = document.getElementById("canvas2");
	ctx2 = canvas2.getContext("2d");

    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    canvas2.width = 360;
	canvas2.height = 170;

    mouse.x = canvas.width/2;
    mouse.y = canvas.height/2;

	// canvas.width = 500;
	// canvas.height = 500;

    let flowField= new Render(ctx2, ctx)
    flowField.animate();

}

class Render
{
    #ctx;
    #ctx2;
    constructor(ctx2, ctx)
    {
        this.walls =[];
        this.angle = 0;
        this.#ctx = ctx;
        this.#ctx2 = ctx2;
        this.gradient;
		this.#createGradient();
        //make it rainbow colored
		this.#ctx.strokeStyle = this.gradient

        //just making some walls
        //this.#ctx.strokeStyle = "white";

        //should've made a function to do that
        let wall = new Wall( 200, 300, 800, 300, this.#ctx);
        this.walls.push(wall);

        let wall2 = new Wall( 200, 700, 800, 700, this.#ctx);
        this.walls.push(wall2);

        let wall3 = new Wall( 200, 700, 200, 300, this.#ctx);
        this.walls.push(wall3);
        
        let wall4 = new Wall( 800, 700, 800, 300, this.#ctx);
        this.walls.push(wall4);

        let wall6 = new Wall( 800, 450, 700, 450, this.#ctx);
        this.walls.push(wall6);

        let wall7 = new Wall( 800, 350, 700, 350, this.#ctx);
        this.walls.push(wall7);

        let wall8 = new Wall( 300, 700, 300, 450, this.#ctx);
        this.walls.push(wall8);

        let wall9 = new Wall( 500, 700, 500, 450, this.#ctx);
        this.walls.push(wall9);


        let wall5 = new Wall( 100, 400, 600, 200, this.#ctx);
        this.walls.push(wall5);
    }

    #createGradient() {
		this.gradient = this.#ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
		this.gradient.addColorStop("0.1", "#ff5c33");
		this.gradient.addColorStop("0.2", "#ff66b3");
		this.gradient.addColorStop("0.4", "#ccccff");
		this.gradient.addColorStop("0.6", "#b3ffff");
		this.gradient.addColorStop("0.8", "#80ff80");
		this.gradient.addColorStop("0.9", "#ffff33");
	}

    animate(){

        this.#ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#ctx2.clearRect(0, 0, this.#ctx2.canvas.clientWidth, this.#ctx2.canvas.clientHeight);

        this.walls.forEach(wall => {
            wall.drawWall(this.#ctx);
        });
        let rays = 60;
        for(let i = 0+visionAngle; i < rays+visionAngle; i+=0.5){
            let ray = new Ray(mouse.x, mouse.y ,i);
            let collisionPoint = ray.collidesAtPoint(this.walls, this.#ctx);
            ray.drawRay(this.#ctx);
            this.moveSpeed+=0.01;


            //drawing collumn to the "3d screen"
            if(collisionPoint != null)
            {
                let distanceToPoint = Math.sqrt((collisionPoint.x-mouse.x) * (collisionPoint.x-mouse.x) + (collisionPoint.y-mouse.y) * (collisionPoint.y-mouse.y));
                let columnHeight =20*(this.#ctx2.canvas.clientHeight / distanceToPoint);

                let drawStart = -columnHeight / 2 + this.#ctx2.canvas.clientHeight / 2;
                if (drawStart < 0)
                    drawStart = 0;

                let drawEnd = columnHeight / 2 + this.#ctx2.canvas.clientHeight / 2;
                if (drawEnd >= this.#ctx2.canvas.clientHeight)
                    drawEnd = this.#ctx2.canvas.clientHeight - 1;


                var r_a = 1/(distanceToPoint/255*5); 
                this.#ctx2.strokeStyle = "rgba(255, 255, 255, " + r_a + ")"; ;
                let lineWidth = this.#ctx2.canvas.clientWidth/60;
                this.#ctx2.lineWidth = lineWidth;
                this.#ctx2.beginPath();
                this.#ctx2.moveTo((i-visionAngle) * lineWidth, drawStart);
                this.#ctx2.lineTo((i-visionAngle)  * lineWidth, drawEnd);
                //ctx.strokeStyle = "white"
                this.#ctx2.stroke();
            }
            
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));//updates the canvas
    }
    
}

