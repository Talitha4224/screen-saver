const MAX_X = 500;
const MAX_Y = 500;
const FRAME_DELAY = 10;
const POINT_SIZE = 30;

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const begin = () => {
    const canvas = document.getElementById('screensaver');
    const context = canvas.getContext('2d');

    canvas.width = MAX_X;
    canvas.height = MAX_Y;

    frame(canvas, context)();
}

const frame = (canvas, context) => () => {
    //Clear
    context.fillStyle = "#000000";  
    context.fillRect(0, 0, MAX_X, MAX_Y);

    //Paint
    paintFrame(canvas, context);

    //Animate
    setTimeout(() => requestAnimationFrame(frame(canvas, context)), FRAME_DELAY);
}

//create points
const numberOfPoints = 50;
const points = Array(numberOfPoints).fill({}).map(point => {
    return {
        color: 'rgb(' + getRandomNumber(0, 255) + ',' +  getRandomNumber(0, 255) + ',' + getRandomNumber(0, 225) + ')',

        x: {
            loc: getRandomNumber(0, MAX_X),
            speed: getRandomNumber(0.1, 2), 
            dir: getRandomNumber(0, 2) < 1 ? -1 : 1
        },
        y: {
            loc: getRandomNumber(0, MAX_Y),
            speed: getRandomNumber(0.1, 2), 
            dir: getRandomNumber(0, 2) < 1 ? -1 : 1
    
        }
    }
})

//Math.sqrt(a^2 + b^2)    returns c
 
const paintFrame = (canvas, context) => {
    points.forEach(point => { 

    //Paint point
    context.fillStyle = point.color;
    context.beginPath();
    context.arc(point.x.loc, point.y.loc,  POINT_SIZE, 0,  2 * Math.PI, true);
    context.fill();

    //Mouth
    if(point.y.dir === -1) {
        // Smile
        context.beginPath();
        context.arc(point.x.loc - 0, point.y.loc -2 , 20, 0, Math.PI, false);
        context.stroke();
    } else {
        // Frown
        context.beginPath();
        context.arc(point.x.loc + 0, point.y.loc  + 20, 17, 0, Math.PI, true);
        context.stroke();
    }

    
    // Right Eye
    context.beginPath();
    context.arc(point.x.loc  + 10, point.y.loc - 10, 5,  0, Math.PI * 2, false);
    context.stroke();
    // Right Pupil
    context.fillStyle = "#000000"
    context.beginPath();
    context.arc(point.x.loc  + 10 + (point.x.dir * 2.5), point.y.loc - 10 + (point.y.dir * 2.5), 2, 0, Math.PI * 2);
    context.fill();

    // Left Eye
    context.beginPath();
    context.arc(point.x.loc - 10, point.y.loc - 10, 5, 0, Math.PI * 2, false);
    context.stroke();
    // Left Pupil
    context.fillStyle = "#000000"
    context.beginPath();
    context.arc(point.x.loc - 10 + (point.x.dir * 2.5), point.y.loc - 10 + (point.y.dir * 2.5), 2, 0, Math.PI * 2);
    context.fill();


    //Move point
    point.x.loc = point.x.loc + point.x.speed * point.x.dir;
    point.y.loc = point.y.loc + point.y.speed * point.y.dir;
    

    //Bounce point
    if(point.x.loc >= MAX_X || point.x.loc <= 0) {
        point.x.dir *= -1;
    }
    if(point.y.loc >= MAX_Y || point.y.loc <= 0) {
        point.y.dir *= -1;
    }
    }) 
};
