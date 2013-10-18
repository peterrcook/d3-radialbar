function radialBarChart() {

  // Configurable variables
  var margin = {top: 20, right: 20, bottom: 20, left: 20};
  var barHeight = 100;
  var reverseLayerOrder = false;
  var barColors = undefined;
  var capitalizeLabels = false;
  var domain = [0, 100];
  var tickValues = undefined;
  var colorLabels = false;

  // Scales & other useful things
  var numBars = null;
  var barScale = null;
  var keys = null;
  var labelRadius = 0;


  function init(d) {
    barScale = d3.scale.linear().domain(domain).range([0, barHeight]);

    keys = d3.map(d[0].data).keys();
    numBars = keys.length;

    // Radius of the key labels
    labelRadius = barHeight * 1.025;   
  }

  function svgRotate(a) {
    return 'rotate('+ +a +')';
  }

  function svgTranslate(x, y) {
    return 'translate('+ +x +','+ +y +')';
  }

  function chart(selection) {
    selection.each(function(d) {

      init(d);

      if(reverseLayerOrder)
        d.reverse();

      var g = d3.select(this)
        .append('svg')
        .append('g')
        .classed('radial-barchart', true)
          .attr('transform', svgTranslate(margin.left + barHeight, margin.top + barHeight));

      var layers = g.selectAll('g')
        .data(d)
        .enter()
        .append('g')
        .attr('class', function(d, i) {
          return 'layer-' + i;
        })
        .classed('layer', true);

      layers
        .selectAll('path')
        .data(function(d) {
          var m = d3.map(d.data);
          return m.values(); 
        })
        .enter()
        .append('path')
        .attr('d', d3.svg.arc().innerRadius(0).outerRadius(or).startAngle(sa).endAngle(ea))
        .style('fill', function(d, i) {
          if(!barColors) return;
          return barColors[i % barColors.length];
        });

      // Spokes
      g.append('g')
        .classed('spokes', true)
        .selectAll('line')
        .data(keys)
        .enter()
        .append('line')
        .attr('y2', -barHeight)
        .attr('transform', function(d, i) {return svgRotate(i * 360 / numBars);});

      // Axis
      var axisScale = d3.scale.linear().domain(domain).range([0, -barHeight]);
      var axis = d3.svg.axis().scale(axisScale).orient('right');
      if(tickValues)
        axis.tickValues(tickValues);
      g.append('g')
        .classed('axis', true)
        .call(axis);

      // Outer circle
      g.append('circle')
        .attr('r', barHeight)
        .classed('outer', true)
        .style('fill', 'none');

      // Labels
      var labels = g.append('g')
        .classed('labels', true);

      labels.append('def')
        .append('path')
        .attr('id', 'label-path')
        .attr('d', 'm0 ' + -labelRadius + ' a' + labelRadius + ' ' + labelRadius + ' 0 1,1 -0.01 0');

      labels.selectAll('text')
        .data(keys)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', function(d, i) {return colorLabels ? barColors[i % barColors.length] : null;})
        .append('textPath')
        .attr('xlink:href', '#label-path')
        .attr('startOffset', function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
        .text(function(d) {return capitalizeLabels ? d.toUpperCase() : d;});
    });

  }

  /* Arc functions */
  or = function(d, i) {
    return barScale(d);
  }
  sa = function(d, i) {
    return (i * 2 * Math.PI) / numBars;
  }
  ea = function(d, i) {
    return ((i + 1) * 2 * Math.PI) / numBars;
  }

  /* Configuration getters/setters */
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.barHeight = function(_) {
    if (!arguments.length) return barHeight;
    barHeight = _;
    return chart;
  };

  chart.reverseLayerOrder = function(_) {
    if (!arguments.length) return reverseLayerOrder;
    reverseLayerOrder = _;
    return chart;
  };

  chart.barColors = function(_) {
    if (!arguments.length) return barColors;
    barColors = _;
    return chart;
  };

  chart.capitalizeLabels = function(_) {
    if (!arguments.length) return capitalizeLabels;
    capitalizeLabels = _;
    return chart;
  };

  chart.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return chart;
  };

  chart.tickValues = function(_) {
    if (!arguments.length) return tickValues;
    tickValues = _;
    return chart;
  };

  chart.colorLabels = function(_) {
    if (!arguments.length) return colorLabels;
    colorLabels = _;
    return chart;
  };

  return chart;
}
