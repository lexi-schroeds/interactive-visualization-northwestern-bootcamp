// Create an array of each country's numbers
let australia = Object.values(country_data.australia);
let brazil = Object.values(country_data.brazil);
let uk = Object.values(country_data.uk);
let mexico = Object.values(country_data.mexico);
let singapore = Object.values(country_data.singapore);
let southAfrica = Object.values(country_data.southAfrica);

// Create an array of category labels
let labels = Object.keys(country_data.australia);

// Display the default plot
function init() {

  // Default trace for the country data
  let trace = {
    values: australia,
    labels: labels,
    type: "pie",
    sort: false // Ensure sectors are not reordered
  }

  // Data Array
  let data = [trace];

  // Layout object
  let layout = {
    height: 600,
    width: 800
  };

  // Render the plot to the div tag with id "pie"
  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Initialize an empty array for the new country's data
  let newdata = [];

  // If/Else statement to assign the chosen country to the new dataset
  if (dataset == 'australia') {
    newdata = australia;
  }
  else if (dataset == 'brazil') {
    newdata = brazil;
  }
  else if (dataset == 'uk') {
    newdata = uk;
  }
  else if (dataset == 'mexico') {
    newdata = mexico;
  }
  else if (dataset == 'singapore') {
    newdata = singapore;
  }
  else if (dataset == 'southAfrica') {
    newdata = southAfrica;
  }

  // Call function to update the chart
  updatePlotly(newdata);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();
