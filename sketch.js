let myInput;
let slider;
let jumpButton;
let isJumping = false;
let urlSelect; // 新增下拉選單變數

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  myInput = createInput('淡江大學');
  myInput.position(20, 20);
  myInput.size(200, 50);
  myInput.style('font-size', '30px');
  
  slider = createSlider(15, 80, 30);
  slider.position(20, 90);
  slider.style('width', '200px');
  
  jumpButton = createButton('跳動');
  jumpButton.position(240, 90);
  jumpButton.mousePressed(toggleJiggle);
  
  // 新增下拉選單，放在跳動按鈕右邊
  urlSelect = createSelect();
  urlSelect.position(310, 90);
  urlSelect.style('font-size', '16px');
  
  // 加入三個網址選項
  urlSelect.option('淡江大學', 'https://www.tku.edu.tw');
  urlSelect.option('Google', 'https://www.google.com');
  urlSelect.option('YouTube', 'https://www.youtube.com');
  
  urlSelect.changed(changeWebsite); // 綁定選單改變事件
}

function changeWebsite() {
  let url = urlSelect.value(); // 取得選單的值
  document.getElementById('myFrame').src = url; // 修改 iframe 的網址
}

function toggleJiggle() {
  isJumping = !isJumping;
}

function draw() {
  background(30); // 深色背景，更好看
  
  let content = myInput.value();
  let fontSize = slider.value();
  
  if (content.length > 0) {
    textAlign(LEFT, CENTER);
    textSize(fontSize);
    textFont('Helvetica Neue'); // 換字型
    
    let step = textWidth(content) + 30;
    let rowCount = 0;
    
    for (let y = 100; y < height; y += fontSize + 20) {
      let colCount = 0;
      
      for (let x = 0; x < width; x += step) {
        
        let yOffset = 0;
        if (isJumping) {
          yOffset = sin(frameCount * 0.15 + rowCount * 2.0 + colCount * 0.8) * 40;
        }
        
        // 用 sin 讓每個字顏色漸層變化
        let r = map(sin(frameCount * 0.02 + rowCount * 0.5), -1, 1, 150, 255);
        let g = map(sin(frameCount * 0.02 + colCount * 0.5 + 2), -1, 1, 100, 220);
        let b = map(sin(frameCount * 0.02 + rowCount * 0.3 + 4), -1, 1, 200, 255);
        fill(r, g, b, 200); // 加上透明度
        
        text(content, x, y + yOffset);
        colCount++;
      }
      rowCount++;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}