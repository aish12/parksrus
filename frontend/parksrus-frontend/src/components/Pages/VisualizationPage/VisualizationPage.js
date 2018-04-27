import * as React from 'react';

import { } from 'react-bootstrap';
import Page from '../../Page/Page';
import axios from 'axios';

import * as d3 from 'd3';

class VisualizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      coffeeShops: [],
      scenicLocations: [],
      snapshots: []
    };
    this.svg = React.createRef();
  }

  // componentWillMount() {
  //   this.setState({
  //     cities: this.props.cities,
  //     coffeeShops: this.props.coffeeShops,
  //     scenicLocations: this.props.scenicLocations,
  //     snapshots: this.props.snapshots
  //   });
  // }

  getAPIEndpointMappings() {
    let terms = new Map();
    terms.set("coffeeShops", "shop");
    terms.set("scenicLocations", "scenic");
    terms.set("snapshots", "snap");
    return terms;
  }

  getCoordinatePair(entity, label, apiMap) {
    return "("
        + entity[apiMap.get(label) + "_latitude"]
        + ","
        + entity[apiMap.get(label) + "_longitude"]
        + ")";
  }

  getEntityLabel(entity, label, apiMap) {
    return entity[apiMap.get(label) + '_name'];
  }

  getColor(label) {
    switch (label) {
      case 'coffeeShops':
        return '#a55eea';
      case 'scenicLocations':
        return '#e71d36';
      case 'snapshots':
        return '#2ec4b6';
    }
  }

  getNodes() {
    let nodes = [];
    let apiMap = this.getAPIEndpointMappings();
    for (let label of apiMap.keys()) {
      this.state[label].forEach(entity => {
        nodes.push({id: this.getCoordinatePair(entity, label, apiMap), value: 24, color: this.getColor(label), group: 1, label: this.getEntityLabel(entity, label, apiMap)})});
    }
    this.state.cities.forEach(entity => {
      nodes.push({id: entity.city_id, value: 32, color: 'orange', label: entity.city_name.split(',')[0], group: 0});
    });
    return nodes;
  }

  getEdges() {
    let edges = [];
    let apiMap = this.getAPIEndpointMappings();
    for (let label of apiMap.keys()) {
      this.state[label].forEach(entity => {
        let coordinates = this.getCoordinatePair(entity, label, apiMap);
        let city_id = entity["city_id"];
        edges.push({source: "" + city_id, target: coordinates})
      })
    }
    return edges;
  }

  getScenicLocations() {
    return axios.get('http://api.espressoyoself.me/sceniclocations');
  }

  getCoffeeShops() {
    return axios.get('http://api.espressoyoself.me/coffeeshops');
  }

  getSnapshots() {
    return axios.get('http://api.espressoyoself.me/snapshots');
  }

  getCities() {
    return axios.get('http://api.espressoyoself.me/getcities');
  }

  componentWillMount() {
    console.log('will mount')
  }

  drawVisualization() {
    let nodes = this.getNodes();
    let edges = this.getEdges();
    this.setState({
      nodes: nodes,
      edges: edges
    }, function() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const svg = d3.select(this.svg.current)
      .attr('width', width)
      .attr('height', height);

      const zoomLayer = d3.select(this.svg.current).append('g').attr('class', 'zoom');

      const simulation = d3.forceSimulation()
      .force('link', d3.forceLink()
      .distance(function(d) {return 128; })
      .id(function(d) { return d.id; })
      .strength(0.9))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collide', d3.forceCollide(function(d) {
        return 24;
      }))
      .force('radial', d3.forceRadial(10, width / 2, height / 2))
      .force('center', d3.forceCenter(width / 2, height / 2));

      const container = d3.select('.zoom')
      .selectAll('g')
      .data(this.state.nodes);

      const link = d3.select('.zoom')
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.state.edges)
      .enter().append('line')
      .attr('stroke-width', 1.5)
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.5);

      const node = container.enter().append('g')
      .attr('transform', function() {
        return 'translate(' + width / 2 + ',' + height / 2 + ')';
      }).call(d3.drag()
      .on('start', dragStart)
      .on('drag', dragged)
      .on('end', dragStop));

      node.append('circle')
      .attr('r', function(d) {
        return d.value;
      })
      .attr('fill', function(d) {
        return d.color;
      })
      .attr('stroke', '#fff')
      .attr('z-index', 5)
      .on('mouseover', function(d) {
        d3.select(d3.select(this).node().parentNode).select('text').text(d.label);
      })
      .on('mouseout', function(d) {
        let select = d3.select(d3.select(this).node().parentNode).select('text');
        if (select.text() && d.group > 0) {
          select.text('')
        }
      });

      node.append('text')
      .attr('fill', function(d) {
        return (d.group > 0) ? 'black' : 'white';
      })
      .attr('font-size', '8pt')
      .attr('text-anchor', 'middle')
      .text(function(d) {
        if (d.hasOwnProperty('label') && d.group === 0) {
          return d.label;
        } else {
          return "";
        }
      });

      simulation.nodes(this.state.nodes)
      .on('tick', tick);
      simulation.force('link')
      .links(this.state.edges);

      let zoomed = function() {
        zoomLayer.attr('transform', d3.event.transform);

      };

      svg.call(d3.zoom().scaleExtent([1 / 2], 12).on('zoom', zoomed));

      function tick() {
        node.attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
        link.attr('x1', function(d) {
          return d.source.x;
        });
        link.attr('y1', function(d) {
          return d.source.y;
        });
        link.attr('x2', function(d) {
          return d.target.x;
        });
        link.attr('y2', function(d) {
          return d.target.y;
        })
      }

      function dragStart(d) {
        simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragStop(d) {
        simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    });
  }

  componentDidMount() {
    const scope = this;
    axios.all([scope.getCoffeeShops(), scope.getScenicLocations(), scope.getSnapshots(), scope.getCities()])
    .then(axios.spread(function(coffeeShops, scenicLocations, snapshots, cities) {
      scope.setState({
        isLoaded: true,
        coffeeShops: coffeeShops.data,
        scenicLocations: scenicLocations.data,
        snapshots: snapshots.data,
        cities: cities.data
      }, function() {
        this.drawVisualization()
      });
    })).catch(function(error) {
      console.error(error);
      scope.setState({
        isLoaded: false,
        error: error
      });
    });
  }

  render() {
    return (
        <div>
          <svg ref={this.svg}>
          </svg>
        </div>
    );
  }
}

export default VisualizationPage;