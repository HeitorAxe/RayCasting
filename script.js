let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

const mouse = {
    x:0,
    y:0,
    down: false
}

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

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = height;
	// canvas.width = 500;
	// canvas.height = 500;

    let flowField= new Render(ctx, 2)
    flowField.animate();

}

class Render
{
    #ctx;
    constructor(ctx, moveSpeed)
    {
        this.moveSpeed = 0;
        this.walls =[];
        this.angle = 0;
        this.#ctx = ctx;
        this.gradient;
		this.#createGradient();
        //make it rainbow colored
		//this.#ctx.strokeStyle = this.gradient

        //just making some walls
        this.#ctx.strokeStyle = "white";

        let wall = new Wall( 200, 300, 800, 300, this.#ctx);
        this.walls.push(wall);

        let wall2 = new Wall( 200, 700, 800, 700, this.#ctx);
        this.walls.push(wall2);

        let wall3 = new Wall( 200, 700, 200, 300, this.#ctx);
        this.walls.push(wall3);
        
        let wall4 = new Wall( 800, 700, 800, 300, this.#ctx);
        this.walls.push(wall4);


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

        this.walls.forEach(wall => {
            wall.drawWall(this.#ctx);
        });

        for(let i = 0; i < 360; i+=1){
            let ray = new Ray(mouse.x, mouse.y ,i);
            ray.collidesAtPoint(this.walls, this.#ctx);
            ray.drawRay(this.#ctx);
            this.moveSpeed+=0.01;
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));//updates the canvas
    }
    
}

