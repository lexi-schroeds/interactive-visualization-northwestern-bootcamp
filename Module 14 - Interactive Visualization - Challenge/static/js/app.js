function buildMetadata(sample) {
  // Fetch data from samples.json
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      // Filter the metadata for the object with the desired sample number
      const metadata = data.metadata.find(item => item.id === parseInt(sample));

      // Select the panel with id of `#sample-metadata` and clear any existing metadata
      const panel = d3.select("#sample-metadata");
      panel.html("");

      // Append new tags for each key-value pair in the filtered metadata
      Object.entries(metadata).forEach(([key, value]) => {
          panel.append("p").text(`${key}: ${value}`);
      });
  });
}

function buildCharts(sample) {
  // Fetch data from samples.json
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      // Filter the samples for the object with the desired sample number
      const sampleData = data.samples.find(item => item.id === sample);

      // Extract otu_ids, otu_labels, and sample_values
      const otuIds = sampleData.otu_ids;
      const otuLabels = sampleData.otu_labels;
      const sampleValues = sampleData.sample_values;

      // Build a Bubble Chart
      const traceBubble = {
          x: otuIds,
          y: sampleValues,
          text: otuLabels,
          mode: 'markers',
          marker: {
              size: sampleValues,
              color: otuIds
          }
      };

      const layoutBubble = {
          title: 'Bacteria Cultures Per Sample',
          yaxis: { title: 'Number of Bacteria' },
          xaxis: { title: 'OTU ID' }
      };

      const dataBubble = [traceBubble];
      Plotly.newPlot('bubble', dataBubble, layoutBubble);

      // Build a Bar Chart
      const topOTUs = otuIds.slice(0, 10).reverse();
      const topValues = sampleValues.slice(0, 10).reverse();
      const topLabels = otuLabels.slice(0, 10).reverse();

      const traceBar = {
          x: topValues,
          y: topOTUs.map(otu => `OTU ${otu}`),
          text: topLabels,
          type: 'bar',
          orientation: 'h'
      };

      const layoutBar = {
          title: 'Top 10 Bacteria Cultures Found',
          xaxis: { title: 'Number of Bacteria' }
      };

      const dataBar = [traceBar];
      Plotly.newPlot('bar', dataBar, layoutBar);
  });
}

function init() {
  // Fetch data from samples.json
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      // Get the names field
      const sampleNames = data.names;

      // Select the dropdown with id of `#selDataset`
      const dropdown = d3.select("#selDataset");

      // Populate the select options with the list of sample names
      sampleNames.forEach((sample) => {
          dropdown.append("option").text(sample).property("value", sample);
      });

      // Get the first sample from the list
      const firstSample = sampleNames[0];

      // Build charts and metadata panel with the first sample
      buildCharts(firstSample);
      buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
