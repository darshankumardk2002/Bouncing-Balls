const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const catchPoints = [
    { x: 100, y: 100, radius: 20 },
    { x: 300, y: 300, radius: 20 },
    { x: 500, y: 500, radius: 20 }
];

const stats = {
    totalCaught: 0,
    redCaught: 0,
    blueCaught: 0,
    greenCaught: 0,
    yellowCaught: 0,
    purpleCaught: 0
};

class Ball {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.checkCaught();
        this.draw();
    }

    checkCaught() {
        catchPoints.forEach(point => {
            const dx = this.x - point.x;
            const dy = this.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + point.radius) {
                stats.totalCaught++;
                if (this.color === 'red') stats.redCaught++;
                if (this.color === 'blue') stats.blueCaught++;
                if (this.color === 'green') stats.greenCaught++;
                if (this.color === 'yellow') stats.yellowCaught++;
                if (this.color === 'purple') stats.purpleCaught++;

                // Reset ball position
                this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
                this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
                this.dx = (Math.random() - 0.5) * 4;
                this.dy = (Math.random() - 0.5) * 4;
            }
        });
    }
}

function createBalls(numBalls) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    for (let i = 0; i < numBalls; i++) {
        const radius = Math.random() * 20 + 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        balls.push(new Ball(x, y, radius, color, dx, dy));
    }
}

function drawCatchPoints() {
    catchPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    });
}

function updateStats() {
    document.getElementById('totalCaught').textContent = stats.totalCaught;
    document.getElementById('redCaught').textContent = stats.redCaught;
    document.getElementById('blueCaught').textContent = stats.blueCaught;
    document.getElementById('greenCaught').textContent = stats.greenCaught;
    document.getElementById('yellowCaught').textContent = stats.yellowCaught;
    document.getElementById('purpleCaught').textContent = stats.purpleCaught;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCatchPoints();
    balls.forEach(ball => ball.update());
    updateStats();
    requestAnimationFrame(animate);
}

createBalls(50);
animate();
