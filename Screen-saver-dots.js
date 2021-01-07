const MAX_X = 500;
const MAX_Y = 500;
const FRAME_DELAY = 10;
const POINT_SIZE = 100;

//Find a random number
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

//Black canvas
const frame = (canvas, context) => () => {
    //Clear
    context.fillStyle = "#000000";  
    context.fillRect(0, 0, MAX_X, MAX_Y);

    //Paint
    paintFrame(canvas, context);

    //Animate
    setTimeout(() => requestAnimationFrame(frame(canvas, context)), FRAME_DELAY);
}

const createSquare = (x, y) => {
    return {
        color: "#FF00FF", 

        x: {
            location: x,
            speed: 1,
            direction: 1
        },
        y: {
            location: y,
            speed: 1,
            direction: 1 
        }
    }
}

const numberOfSquares = 1;
const squares = Array(numberOfSquares).fill({}).map(square => {   //Squares is the varible, square is the function argument
    return createSquare(7, 7);
});

//Paint squares
const paintFrame = (canvas, context) => {
    // Draw all the squares 
    squares.forEach(square => {

        //Paint square
        context.strokeStyle = "#0000FF";         //fillRect needs fillStyle, strokeRect needs strokeStyle
        context.lineWidth = 2;
        context.strokeRect(square.x.location, square.y.location, POINT_SIZE, POINT_SIZE );
    });

    // Add a new square to the right
    squares.push(createSquare(squares[squares.length-1].x.location + 15, squares[squares.length-1].y.location));

    
};

squares.forEach(square => {
    if(square.x.location  >= 450) {
        context.strokeStyle = "#FF0000"
        square.y.direction *= -1   
    }
});
