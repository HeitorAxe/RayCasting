class Ray
{
    constructor(x, y, angle)
    {
        this.x1 = x;
        this.y1 = y;
        this.x2 = this.x1 + Math.cos(Math.PI * angle / 180) * 800;
        this.y2 = this.y1 + Math.sin(Math.PI * angle / 180) * 800;
    }

    pointDistance(x1, y1)
    {
        let x2 = this.x1;
        let y2 = this.y1;
        let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
        return distance;
    }

    collidesAt(wall)
    {
        const x3 = this.x1
        const x4 = this.x2
        const x1 = wall.x1;
        const x2 = wall.x2;

        const y3 = this.y1
        const y4 = this.y2
        const y1 = wall.y1;
        const y2 = wall.y2;

        const den = (x1-x2) * (y3-y4)-(y1-y2)*(x3-x4);

        //they are parallel to each other
        if(den == 0)
        {
            return null;
        }

        const t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den;
        const u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/den;

        //means it collides with a wall
        if(t>0 && t < 1 && u > 0 && u < 1)
        {
            const pt = {x: x1+t*(x2-x1), y: y1+t*(y2-y1)};
            return pt;
        }
        else
        {
            return null;
        }

    }

    collidesAtPoint(walls, ctx)
    {
        let closestWall = Infinity
        let point = {x: this.x2, y: this.y2};
        let collides = false;
        walls.forEach(wall => {
            if(this.collidesAt(wall))
            {
                collides = true;
                let x = this.collidesAt(wall).x;
                let y = this.collidesAt(wall).y;

                if(this.pointDistance(x, y)<closestWall)
                {
                    closestWall = this.pointDistance(x, y);
                    point.x = x;
                    point.y = y;

                }

            }
        });

        if(collides)
        {
            this.x2 = point.x;
            this.y2 = point.y;
            //drawing point of collision with wall
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'grey';
            ctx.fill();
            ctx.stroke();
            return point;
        }
    }

    drawRay(ctx)
    {
        ctx.lineWidth = .2
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        //ctx.strokeStyle = "white"
        ctx.stroke();
    }
}