#Radial Bar Chart

A [D3](http://d3js.org) reusable radial bar chart.

###Simple example
```javascript
var data = [{'Winter': 5, 'Spring': 8, 'Summer': 12, 'Autumn': 9}];
var chart = radialBarChart()
  .barHeight(250)
  .domain([0,15])
  .barColors([steelblue]);

d3.select('#chart')
  .datum(data)
  .call(chart);
```

###Implementation

The implementation follows the [reusable charts](http://bost.ocks.org/mike/chart/) convention proposed by Mike Bostock.

##Configuration

The chart can be configured in a number of ways (all optional)

* **margin**: An object specifying the margins e.g. {top: 20, right: 20, bottom: 20, left: 20}
* **domain**: The domain of the data e.g. [0, 10]
* **barHeight**: The maximum bar height: this determines the overall size of the chart
* **barColors**: An array specifying the bar colours. Repeats if shorter than the number of bars.
* **colorLabels**: Colour the labels the same colour as the bar (boolean)
* **tickValues**: An array specifying axis tick values e.g. [20, 40, 60, 80, 100]
* **tickCircleValues**: An array specifying background circular grid line values e.g. [0, 10, 20, 30, 40]
* **capitalizeLabels**: Capitalises the data labels
* **reverseLayerOrder**: Reverse the order in which the layers are rendered

###About
This chart was created by [Peter Cook](http://prcweb.co.uk)
Twitter: [@prcweb](http://twitter.com/prcweb)
