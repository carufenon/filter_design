// calc_filter.js

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

  // 新しいデータを生成（適切な処理に置き換えてください）

  var filter_length = document.getElementById('filterLength').value;
  

  const newXData = [...Array(100).keys()];
  const newYData = newXData.map(x => filter_length * Math.sin(x / 10.0));

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
}
