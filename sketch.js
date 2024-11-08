let font;  // 載入字型文字 
let points = [];  // 轉成點狀文字
let r = 20; // 控制圓的半徑
let rotationDirection = 0; // 控制旋轉方向: 0為正常，-1為上下翻轉，1為左右翻轉
var sound1;
var fc;

// 在執行setup()前載入字型
function preload() {  
    font = loadFont("fonts/PassionOne-Regular.ttf");
    sound1 = loadSound("Karencici -  愛你但說不出口 (Official Music Video).mp3")
}

// 設定環境
function setup() { 
    createCanvas(windowWidth, windowHeight); // 設定畫布的寬高
    angleMode(DEGREES);
    background("#bfd7ea"); // 背景顏色
    analyzer = new p5.Amplitude();
    analyzer.setInput(sound1)
    
    // 轉成文字圖檔
    points = font.textToPoints("TKUET", -300, 80, 200, {
        sampleFactor: 0.15
    });
}

// 畫圖函數，每秒執行60次
function draw() { 
    background("#bfd7ea"); // 設定背景顏色

    // 畫矩形和橢圓的背景圖形
    drawPattern();
    
    // 將文字點移動至畫布中心並根據旋轉方向旋轉
    translate(width / 2, height / 2);

    if(sound1.isPlaying())
    { //音樂有撥放時
        fc = map(analyzer.getLevel(),0,1,0,100)
    }
    else
    {//音樂沒撥放時
        fc = map(mouseX,0,width,0,100)
    }

    // 根據方向持續旋轉
    if (rotationDirection === 0) {
        rotate((frameCount / 2) % 360); // 正常旋轉
    } else if (rotationDirection === -1) {
        rotate((frameCount / 2) % 360); // 上下翻轉
        scale(1, -1); // 垂直翻轉
    } else if (rotationDirection === 1) {
        rotate((frameCount / 2) % 360); // 左右翻轉
        scale(-1, 1); // 水平翻轉
    }

    // 動態變色
    let colorR = 128 + 127 * sin(frameCount * 50);
    let colorG = 128 + 127 * sin(frameCount * 10 + 2);
    let colorB = 128 + 127 * sin(frameCount * 10 + 4);

    // 繪製文字點的效果
    for (let i = 0; i < points.length; i++) { 
        fill(colorR, colorG, colorB); // 動態變色
        noStroke();
        ellipse(points[i].x + r * sin(frameCount / 20 + i), points[i].y, 15);
        
        stroke("#555B6E"); // 線條的顏色
        strokeWeight(3); // 線條的粗細
        if (i < points.length - 1) {
            line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
    }
}

// 繪製矩形和橢圓的圖案
function drawPattern() {
    let rect_width = 50 + fc;
    let bc_width = 50 + fc;
    let sc_width = 25;

    for (let y = 0; y < height; y += rect_width) {
        for (let x = 0; x < width; x += rect_width) {
            noFill();
            stroke("#5bc0be");
            strokeWeight(3);

            ellipse(x, y, bc_width);
            rect(x, y, rect_width);
            stroke("#9b5de5");
            ellipse(x, y, sc_width);
            stroke("#5390d9");
            ellipse(x, y, sc_width - fc);
            stroke("#ffcfd2");
            rect(x + 15, y + 15, rect_width);
            rect(x - 15, y - 15, rect_width);
        }
    }
}

// 監聽滑鼠點擊事件
function mousePressed() {
    if(sound1.isPlaying()){
        sound1.stop();
    }else{
        sound1.play();
    }

    if (mouseY < height / 2) { // 上半部點擊
        rotationDirection = (rotationDirection === -1) ? 0 : -1; // 切換到上下翻轉或重設為正常
    } else { // 下半部點擊
        rotationDirection = (rotationDirection === 0) ? 1 : 0; // 切換到左右翻轉或重設為正常
    }

    if (mouseX < width / 2) { // 左半部點擊
        rotationDirection = 1; // 設置為左右翻轉
    } else { // 右半部點擊
        rotationDirection = -1; // 設置為上下翻轉
    }
}

