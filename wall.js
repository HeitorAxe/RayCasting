class Wall{
    constructor(x1, y1, x2, y2, ctx)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.drawWall(ctx);
    }

    drawWall(ctx)
    {
        ctx.lineWidth = 0.2
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}