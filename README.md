#Radial Bar Chart

A [D3](http://d3js.org) reusable radial bar chart.

###Simple example

  var chart = radialBarChart()
    .barHeight(250)
    .domain([0,10])
    .barColors([steelblue]);

  d3.select('#chart')
    .datum(data)
    .call(chart);

###Implementation

The implementation follows the [reusable charts](http://bost.ocks.org/mike/chart/) convention proposed by Mike Bostock.

##Configuration

The chart can be configured in a number of ways (all optional)

TODO 

###About
This chart was created by [Peter Cook](http://prcweb.co.uk)
Twitter: [@prcweb](http://twitter.com/prcweb)
