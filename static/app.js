// Use the D3 library to read in samples.json from the 
  // URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.


// Fetch the JSON data and console log it
let data = "../data/samples.json";
d3.json(data).then(function(results) {
  console.log(results)
});

//---------------------------------------------------------//
              //  Function INIT
//---------------------------------------------------------//  
//---------------------------------------------------------//

  // Use the first sample from the list to build the initial plots
  // Get new data each time a new sample is selected
  // Initializes the page with a default plot

function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(data).then((newData) => {
        var names = newData.names;
        names.forEach((participantSample) => {
            dropdownMenu.append("option").text(participantSample).property("value", participantSample);

        })
        var firstSample = names[0];
        displayMetadata(firstSample);
        buildCharts(firstSample);

    })
};

init();

function optionChanged(newSelection){
    displayMetadata(newSelection);
    buildCharts(newSelection);

}

//---------------------------------------------------------//
//---------------------------------------------------------//
              //  Display Sample Metadata
//---------------------------------------------------------//  
//---------------------------------------------------------// 

    // Display the sample metadata, i.e., an individual's demographic information.
    // Display each key-value pair from the metadata JSON object somewhere on the page.


// function displayMetadata() {
function displayMetadata(participantSample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(id => 
        id.id == participantSample);
        var result = resultsArray[0]
    // Use d3 to select the panel with id of `#sample-metadata`
        var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing data
        panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
        })
    })
    };

    
//---------------------------------------------------------//
//---------------------------------------------------------//
              //  Fetch Sample Data for Plots
//---------------------------------------------------------//  
//---------------------------------------------------------//     

// Use `d3.json` to fetch the sample data for the plots

function buildCharts(participantSample){
    d3.json(data).then((newData) => {
        console.log(newData);

        var metadata = newData.metadata;
        console.log(metadata);
        var resultsArray = metadata.filter(sampleObj => sampleObj.id == participantSample);
        var result = resultsArray[0];
        var washfreq = result.wfreq;    


        var sample = newData.samples;
        var sampleArray = sample.filter(id => 
        id.id == participantSample);
        var sampleResult = sampleArray[0];
        var otu_ids = sampleResult.otu_ids;
        var otu_labels = sampleResult.otu_labels;
        var sample_values = sampleResult.sample_values;    

        var yticks = otu_ids.slice(0, 10).reverse().map(otuid=>`OTU ID ${otuid}`)



        //---------------------------------------------------------//
                    //  Build a BAR Chart
        //---------------------------------------------------------//  
        //---------------------------------------------------------// 

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
            // found in each individual
            // Use sample_values as the values for the bar chart
            // Use otu_ids as the labels for the bar chart
            // Use otu_labels as the hovertext for the chart

        var barData = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            marker: {
                color: ['#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85', '#7C3D85']},        
            text: otu_labels,
            orientation: 'h'
          }];
        
          var barLayout = {
            title: {
                text:'Top 10 Wines',
                font: {color: "black",
                  size: 18
                }},
            margin: { t: 30, l: 150 }
          };

          Plotly.newPlot('bar', barData, barLayout);
   
          
        //---------------------------------------------------------//
                    //  Build a BUBBLE Chart
        //---------------------------------------------------------//  
        //---------------------------------------------------------// 
            // Create a bubble chart that displays each sample
                // Use otu_ids for the x values
                // Use sample_values for the y values
                // Use sample_values for the marker size
                // Use otu_ids for the marker colors
                // Use otu_labels for the text values


    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            color: otu_ids,
            colorscale: 'purple',
            size: sample_values
        },
        text: otu_labels,
      };
      
      var bubbledata = [trace1];
      
      var bubbleLayout = {
        title: {
            text:'All Available Wines',
            font: {color: "black",
              size: 18
            }},
        margin: { t: 30, b: 150},
        xaxis: { title: "Wine ID" },
        yaxis: { title: "Rating"},
        hovermode: "closest",
      };
      
      Plotly.newPlot('bubble', bubbledata, bubbleLayout);

    //---------------------------------------------------------//
    //---------------------------------------------------------//
                //  Build a GAUGE Chart
    //---------------------------------------------------------//  
    //---------------------------------------------------------// 


      var gaugeData = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: washfreq,
          title: { text: "Map Goes Here", font: { size: 18 } },
          gauge: {
            axis: { range: [0, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "black" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                {range: [0, 1], color: "#E5f4E1"},
                {range: [1, 2], color: "#C3E7BF"},
                {range: [2, 3], color: "#B5E1AF"},
                {range: [3, 4], color: "#A8DD9B"},
                {range: [4, 5], color: "#8CBB80"},
                {range: [5, 6], color: "#71A965"},
                {range: [6, 7], color: "#4F9344"},
                {range: [7, 8], color: "#2B7D23"},
                {range: [8, 9], color: "#19733C"},
                {range: [9, 10], color:"#145A27"},
            ],
        }}];
      
      var gaugeLayout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "black" }
      };
      
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    })};



  




