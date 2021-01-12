MAX_X = 500;
MAX_Y = 500;
FRAME_DELAY = 200;
POINT_SIZE = 30;

const begin = () => {
    const canvas = document.getElementById("screen-saver-stickman");
    const context = canvas.getContext('2d');

    canvas.width = MAX_X;
    canvas.height = MAX_Y;

    frame(canvas, context)();
}

//Create canvas
const frame = (canvas, context) => () => {
    //Erase 
    context.fillStyle = "#000000";
    context.fillRect(0, 0, MAX_X, MAX_Y);

    //paint
    paintFrame(canvas, context);

    //Animate
    setTimeout(() => requestAnimationFrame(frame(canvas, context)), FRAME_DELAY);
}


//Interpolation
const interpolate = (point1, point2, number) => {
    return (point2 - point1) / (number - 1);
}

let currentFrame = 0;
const SCALE = 8;
const X_OFFSET = 10;
const Y_OFFSET = 300;
const frameData = [
   //    H    N    N    LE   LH   RE   RH    H    RK    RF   LK    LF
  { x: [4,   4,   4,    3,   3,    4,   6,   4,    3,    2,   5,  5.5],
    y: [2,   4,   6,    8,  10,    8,  10,  10,   13,   15,  13,   15]},
  { x: [4,   4,   4,    3, 3.5,    4,   5,   4,  4.2,  2.5, 5.8,  5.5],
    y: [2,   4,   6,    8,  10,    9,  10,  10,   13, 14.8,  13,   15]},
  { x: [4,   4,   4,  3.5,   4,    4,   4,   4,  3.2,    5,   4,    4],
    y: [2,   4,   6,    8,  10,    8,  10,  10,   13, 14.8,  13,   15]},
  { x: [4,   4,   4,  4.8,   6,  3.7, 2.8,   4,    6,    6,   3,    3],
    y: [2,   4,   6,    8,   9,    8, 9.8,  10,   13,   15,   13,  15]},
  { x: [4,   4,   4,    4,   6,  3.2,   2,   4,    6,    6,  2.5,   2],
    y: [2,   4,   6,    8,   9,    8,  10,   10,  13,   15,   13,  15]},
  { x: [4,   4,   4,    4,   5,  3.2,   3,    4,   4,    4,    3, 1.5],
    y: [2,   4,   6,    8,   10,   8,  10,   10,  13,   15,   13,  14]},
    
];

const paintFrame = (canvas, context) => {

    const keyFrame1 = Math.floor(currentFrame / 10);          
    const keyFrame2 = (keyFrame1 + 1) % frameData.length;    
    const keyFrameInbetween = currentFrame % 10;              
  
 
    const keyFrame1Data = {...frameData[keyFrame1]};
    const keyFrame2Data = {...frameData[keyFrame2]};

    const data = {};
    data.x = keyFrame1Data.x.map((_, i) => {
        return (keyFrame1Data.x[i] + interpolate(keyFrame1Data.x[i], keyFrame2Data.x[i], 10) * keyFrameInbetween)
            * SCALE + X_OFFSET;
    });
    data.y = keyFrame1Data.y.map((_, i) => {
        return (keyFrame1Data.y[i] + interpolate(keyFrame1Data.y[i], keyFrame2Data.y[i], 10) * keyFrameInbetween)
            * SCALE + Y_OFFSET;
    });

    context.fillStyle = "#FFFFFF";
    context.font = "30px Arial";
    context.fillText(`${keyFrame1} - ${keyFrame2}`, 25, 280);

    // const data = {...frameData[0]}; // Fancy way of making a copy of an object (spread operator)
    // data.x = data.x.map(x => x * SCALE + X_OFFSET);  //map() each element return a mofified version (*SCALE + OFFSET)
    // data.y = data.y.map(y => y * SCALE + Y_OFFSET);
    
    // Set up our stroke
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 2;
    context.lineCap = "round";

    // Paint head
    context.beginPath();
    context.arc(data.x[0], data.y[0], 2 * SCALE, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();

    // Paint neck
    context.beginPath();
    context.moveTo(data.x[1], data.y[1]);
    context.lineTo(data.x[2], data.y[2]);
    context.closePath();
    context.stroke();

    //Paint right arm 
    context.beginPath();
    context.moveTo(data.x[2], data.y[2]);
    context.lineTo(data.x[3], data.y[3]);
    context.closePath();
    context.stroke();

    //Paint lower right arm
    context.beginPath();
    context.moveTo(data.x[3], data.y[3]);
    context.lineTo(data.x[4], data.y[4]);
    context.closePath();
    context.stroke();

    //Paint left arm
    context.beginPath();
    context.moveTo(data.x[2], data.y[2]);;
    context.lineTo(data.x[5], data.y[5]);
    context.closePath();
    context.stroke();

    //Paint lower left arm
    context.beginPath();
    context.moveTo(data.x[5], data.y[5]);
    context.lineTo(data.x[6], data.y[6]);
    context.closePath();
    context.stroke();

    //Paint body
    context.beginPath();
    context.moveTo(data.x[2], data.y[2]);
    context.lineTo(data.x[7], data.y[7]);
    context.closePath();
    context.stroke();

    //Paint right leg
    //context.strokeStyle = "#FF0000";
    context.beginPath();
    context.moveTo(data.x[7], data.y[7]);
    context.lineTo(data.x[8], data.y[8]);
    context.closePath();
    context.stroke();

    //paint lower right leg
    //context.strokeStyle = "#FF0000";
    context.beginPath();
    context.moveTo(data.x[8], data.y[8]);
    context.lineTo(data.x[9], data.y[9]);
    context.closePath();
    context.stroke();

    //Paint left leg
   //context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.moveTo(data.x[7], data.y[7]);
    context.lineTo(data.x[10], data.y[10]);
    context.closePath();
    context.stroke();

    //Paint lower left leg
    //context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.moveTo(data.x[10], data.y[10]);
    context.lineTo(data.x[11], data.y[11]);
    context.closePath();
    context.stroke();


    currentFrame = (currentFrame + 1) % (frameData.length * 10); //Loop using Mode operation 

};
