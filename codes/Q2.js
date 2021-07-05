function setup() {
    createCanvas(365, 300);
    noLoop();
    background(255)
  }
  
  function draw() {
    let y_sum = 0; //365日目の株価の合計値
    let repeat = 10000; //モンテカルロの試行回数
    let days = 365; //ランダムウォークのステップ数
    let count = 0;　//試行回数のカウント（repeatと同じ）
    let values = Array(10000);//ヒストグラム描画用に365日目の株価の値を格納
    for(let i = 0; i < repeat; i++) {
      let y = 10000;//初期値10000円
      for(let j = 1; j <= days; j++) {
        y += 200 * randomGaussian() + 5;//N(5, 200^{2})より株価の変化量を足す
      }
      y_sum += y;
      values[i] = y;
      count++;
      console.log(i + "." + y_sum / count);//1試行あたりの365日目の株価の期待値表示
    }
    console.log(min(values) + ", " + max(values));
    let bines = createBins(values, min(values), max(values), 200);
    drawHistogram(bines);
    textAlign(CENTER, CENTER);
    text(`${y_sum / count}`, width / 2, height / 2);//全体で期待値を算出
  }
  
  function createBins(values, minValue, maxValue, numBins) {
    const bins = new Array(numBins);
    bins.fill(0);
    for (let i = 0; i < values.length; ++i) {
      const j = int(((values[i] - minValue) * numBins) / (maxValue - minValue));
      if (0 <= j && j < numBins) {
        bins[j] += 1;
      }
    }
    return bins;
  }
  
  function drawHistogram(bins) {
    const binWidth = width / bins.length;
    const binMax = max(bins);
    fill(0, 0, 255);
    for (let i = 0; i < bins.length; ++i) {
      const binHeight = (height * bins[i]) / binMax;
      rect(binWidth * i, height - binHeight, binWidth, binHeight);
    }
  }
  
  