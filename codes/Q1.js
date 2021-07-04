function setup() {
  createCanvas(365, 300);
  noLoop();
  background(255)
}

function draw() {
  let y_sum = 0;
  let repeat = 10000;
  let days = 365;
  let count = 0;
  for(let i = 0; i < repeat; i++) {
    let y = 10000;
    for(let j = 1; j <= days; j++) {
      y += 200 * randomGaussian() + 5;
    }
    y_sum += y;
    count++;
    console.log(i + "." + y_sum / count);
  }
  textAlign(CENTER, CENTER);
  text(`${y_sum / count}`, width / 2, height / 2);
}
