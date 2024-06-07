// Create our first trace, a bar chart
let trace1 = {
  x: [0, 1, 2, 3, 4, 5],
  y: [0, 5, 10, 15, 20, 25],
  type: "bar"
};

// Create our second trace, a line chart with markers
let trace2 = {
  x: [0, 1, 2, 3, 4, 5],
  y: [0, 1, 4, 9, 16, 25],
  mode: 'lines+markers',
  type: 'scatter'
};

// The data array consists of both traces
let data = [trace1, trace2];

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("plot", data);
