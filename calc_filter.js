// calc_filter.js


// 配列データを表示する関数
function displayData(data, listId) {
  var resultList = document.getElementById(listId);

  // 配列データをループしてリストアイテムに追加
  for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = data[i];
      resultList.appendChild(listItem);
  }
}



document.getElementById('calculateButton').addEventListener('click', calculateAndVisualize);

// 初期のデータを用意
const initialXData = [...Array(100).keys()];
const initialYData = initialXData.map(x => Math.sin(x / 10.0));


// グラフを初回描画
Plotly.newPlot('filter-visualization', [{
  x: initialXData,
  y: initialYData,
  type: 'scatter',
  mode: 'lines',
}]);

// 2つ目のグラフも初回描画
Plotly.newPlot('second-graph', [{
  x: initialXData,
  y: initialYData,
  type: 'scatter',
  mode: 'lines',
}]);

function calculateAndVisualize() {
  // ボタンが押されたときの処理

  // 入力値取得
  var filter_length = document.getElementById('filterLength').value;
  var filter_type = document.getElementById('filterType').value;
  var window_type = document.getElementById('windowType').value;
  var norm_cutoff_freq = document.getElementById('cutoffFrequency').value;

  // LPF計算
  tapn2 = Number((filter_length - 1)/2 + 1)
  var tapArray = Array(tapn2)

  coeff = 0
  wHamming = 0
  coeffWin = 0

  for(let i = 1; i<tapn2; i++){
    i = Number(i)
    coeff = 1/(i*Math.PI) * Math.sin(2*i*Math.PI*norm_cutoff_freq)
    if(window_type == "Hamming"){
        wHamming = 0.54 + 0.46*Math.cos((i*Math.PI)/(tapn2-1))
    }
    coeffWin = coeff * wHamming
    tapArray[i] = coeffWin
  }
  tapArray[0] = norm_cutoff_freq * 2
  // 前半部分の配列を生成
  tapArray_1 = tapArray.slice()
  tapArray_1 = tapArray_1.reverse()
  // 後半部分の配列を生成
  tapArray_2 = tapArray.slice()
  tapArray_2.shift()
  fircoef_lpf = tapArray_1.concat(tapArray_2)
  console.log(fircoef_lpf)

  // tapn2 + 1 ～ filter_length分の連番配列を生成
  const newXData = [...Array(Number(filter_length))].map((_, i) => i - tapn2 + 1)
  const newYData = fircoef_lpf

  // 既存のグラフを更新
  Plotly.update('filter-visualization', {
    x: [newXData],
    y: [newYData],
  });

  // 2つ目のグラフも更新
  Plotly.update('second-graph', {
    x: [newXData],
    y: [newYData],
  });


  // フィルタ係数を表示
  displayData(10, 'resultList');
}
