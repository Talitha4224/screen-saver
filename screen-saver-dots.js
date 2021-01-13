const FRAME_DELAY = 10;
const POINT_SIZE = 10; 
const MAX_X = 500;
const MAX_Y = 500;

getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

//Canvas
const begin = () => {
    const canvas = document.getElementById('screenSaver');
    const context = canvas.getContext('2d');

    canvas.width = MAX_X;
    canvas.height = MAX_Y;

    frame(canvas, context)();
}

const frame = (canvas, context) => () => {
    //Clear
    context.fillStyle = "#000000"
    context.fillRect(0, 0, MAX_X, MAX_Y);

    //Paint
    paintFrame(canvas, context);

    //Animate
    setTimeout(() => requestAnimationFrame(frame(canvas, context)), FRAME_DELAY);
}

//Create points
const NUM_POINTS = 100;
const points = Array(NUM_POINTS).fill({}).map(point => {
    return {
        color: 'rgb(' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) ')',              //rgb(10,20,30)
        
        x: {
            loc: getRandomNumber(0, MAX_X),
            speed: getRandomNumber(0.1, 0.5), 
            dir: getRandomNumber (0, 2) < 1 ? -1 : 1,
        },
        y: {
            loc: getRandomNumber(0, MAX_Y),
            speed: getRandomNumber (0.1, 0.5), 
            dir: getRandomNumber (0, 2) < 1 ? -1 : 1,
        }
    }
});

const paintFrame = (canvas, context) => {
    points.forEach(point => {
    //Paint points
    context.fillStyle = point.color
    context.fillRect(point.x.loc, point.y.loc, POINT_SIZE, POINT_SIZE);  

    //Move point
    point.x.loc = point.x.loc + point.x.speed * point.x.dir;
    point.y.loc = point.y.loc + point.y.speed * point.y.dir;

    //Bounce
    if(point.x.loc >= MAX_X || point.x.loc <= 0) {
        point.x.dir *= -1;
    }
    if(point.y.loc >= MAX_Y || point.y.loc <= 0) {
        point.y.dir *= -1;
    } 
    });
}
