import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Toggle from 'react-toggle'
import Select from 'react-select'

import './GridPage.css';
import 'react-toggle/style.css'
import 'react-select/dist/react-select.css'

import Page from '../Page/Page'
import CardGrid from '../CardGrid/CardGrid'
import axios from 'axios'

class GridPage extends React.Component {
  constructor(props) {
    super(props);
    let curPage = parseInt(this.props.page);
    let path = this.getBasicAPIPath();
    this.state = {
      entities: [],
      page: curPage,
      apiPath: path,
      pagination: [],
      order_by: null,
      direction: 'desc',
      directionToggleState: 'true',
      filters: Object.keys(this.props.filterables)
    }
  }

  getBasicAPIPath() {
    const BASE_URL = "http://parksr.us/api/";
    return BASE_URL + this.props.endpoint;
  }

  getActiveFilters() {
    let query = [];
    for (let filter of this.state.filters) {
      if (this.state.hasOwnProperty(filter)) {
        let meta = this.props.filterables[filter];
        if (this.state[filter] != null && typeof this.state[filter][Symbol.iterator] === 'function') {
          for (let selection of this.state[filter]) {
            query.push({"name": meta.field, "op": meta.op, "val": selection['value']})
          }
        } else if (this.state[filter]){
          query.push({"name": meta.field, "op": meta.op, "val": this.state[filter].value})
        }
      }
    }
    return query;
  }

  getActiveSort() {
    if (this.state.order_by) {
      return [{"field": this.state.order_by, "direction": this.state.direction}];
    } else {
      return [];
    }
  }

  getActivePageQuery(complexQuery) {
    let query = "";
    if (complexQuery) {
      query += "&";
    } else {
      query += "?";
    }
    query += "page=";
    query += this.state.page;
    return query;
  }

  getAPIPath() {
    console.log("getAPIPath");
    console.log("state", this.state);
    let apiPath = this.getBasicAPIPath();
    let activeFilters = this.getActiveFilters();
    let activeSort = this.getActiveSort();
    let complexQuery = activeFilters != null || activeSort != null;
    let activePageQuery = this.getActivePageQuery(complexQuery);
    return apiPath + "?q=" + JSON.stringify({"filters": [{"or": activeFilters}], "order_by": activeSort}) + activePageQuery;
  }

  getFirstPagination() {
    return [<Pagination.First><Link to={'/' + this.props.endpoint + '/pages/' + 1}>&lt;&lt;</Link></Pagination.First>];
  }

  getPrevPagination(curPage) {
    return (curPage - 1 > 0) ? [<Pagination.Prev><Link to={'/' + this.props.endpoint + '/pages/' + (curPage - 1)}>&lt;</Link></Pagination.Prev>] : []
  }

  getLeftEllipsisPagination(curPage) {
    return (curPage >= 4) ? [<Pagination.Ellipsis />] : [];
  }

  getLeftPagination(curPage, pageRange) {
    let leftPagination = [];
    if (curPage > 1) {
      let prevPage = curPage - pageRange;
      let pRange = 0;
      while (prevPage !== curPage && pRange < pageRange) {
        if (prevPage > 0) {
          leftPagination.push(<Pagination.Item><Link to={'/' + this.props.endpoint + '/pages/' + prevPage}>{prevPage}</Link></Pagination.Item>)
        }
        prevPage += 1;
        pRange += 1;
      }
    }
    return leftPagination;
  }

  getActivePagination(curPage) {
    return (curPage >= 1) ? [<Pagination.Item className={"active"}><Link to={'/' + this.props.endpoint + '/pages/' + curPage}>{curPage}</Link></Pagination.Item>] : []
  }

  getRightPagination(curPage, numPages, pageRange) {
    let rightPagination = [];
    if (curPage < numPages) {
      let nextPage = curPage + 1;
      let pRange = 0;
      while (nextPage <= numPages && pRange < pageRange) {
        rightPagination.push(<Pagination.Item><Link to={'/' + this.props.endpoint + '/pages/' + nextPage}>{nextPage}</Link></Pagination.Item>);
        nextPage += 1;
        pRange += 1;
      }
    }
    return rightPagination;
  }

  getRightEllipsisPagination(curPage, numPages) {
    return (numPages - curPage >= 3) ? [<Pagination.Ellipsis />] : []
  }

  getNextPagination(curPage, numPages) {
    return (curPage + 1 <= numPages) ? [<Pagination.Next><Link to={'/' + this.props.endpoint + '/pages/' + (curPage + 1)}>></Link></Pagination.Next>] : []
  }

  getLastPagination(numPages) {
    return [<Pagination.Last><Link to={'/' + this.props.endpoint + '/pages/' + numPages}>>></Link></Pagination.Last>]
  }

  getPagination(curPage, numPages, pageRange) {
    let pagination = [];
    pagination.push(...this.getFirstPagination());
    pagination.push(...this.getPrevPagination(curPage));
    pagination.push(...this.getLeftEllipsisPagination(curPage));
    pagination.push(...this.getLeftPagination(curPage, pageRange));
    pagination.push(...this.getActivePagination(curPage));
    pagination.push(...this.getRightPagination(curPage, numPages, pageRange));
    pagination.push(...this.getRightEllipsisPagination(curPage, numPages));
    pagination.push(...this.getNextPagination(curPage, numPages));
    pagination.push(...this.getLastPagination(numPages));
    return pagination;
  }

  getData() {
    axios.get(this.state.apiPath).then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));
      let pagination = this.getPagination(this.state.page, response.data.total_pages, 2);
      this.setState({
        entities: response.data.objects,
        numPages: response.data.total_pages,
        pagination: pagination
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: error
      });
    })
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(props) {
    this.props = props;
    let curPage = parseInt(this.props.page);
    this.setState({
          page: curPage,
          pagination: []
    }, function() {
      let path = this.getAPIPath();
      this.setState({ apiPath: path }, function() {
        this.getData();
      });
    });

  }

  updateData() {
    let path = this.getAPIPath();
    this.setState({
      apiPath: path
    }, function() {
      console.log("updated path:", this.state.apiPath);
      this.getData()
    })
  }

  handleFilterChange(filterable, selections) {
    const RESET_PAGE = 1;
    this.setState({
      [filterable]: selections,
      page: RESET_PAGE
    }, function() {this.updateData()});
  }

  handleSortChange(selectedOption) {
    const RESET_PAGE = 1;
    if (selectedOption) {
      this.setState({
        "order_by": selectedOption['value'],
        page: RESET_PAGE
      }, function() {this.updateData()});
    } else {
      this.setState({"order_by": null}, function() {this.updateData()})
    }
  }

  handleDirectionChange() {
    if (this.state.direction === 'desc') {
      this.setState({ direction: 'asc' }, function() {
        this.updateData();
      });
    } else {
      this.setState({ direction: 'desc' }, function() {
        this.updateData();
      })
    }
  }
  
  render() {
    let selections = Object.keys(this.props.filterables).map(selection => this.props.filterables[selection])
    let selects = selections.map(filterable =>
      <Select className={"Filter"}
          name={filterable.field}
          value={this.state[filterable.field]}
          onChange={this.handleFilterChange.bind(this, filterable.field)}
          options={filterable.options}
          multi={filterable.multi}
          placeholder={"Filter by " + filterable.field + "..."}>
      </Select>
    );
    let sortables = this.props.sortables;
    let sortingOptions  = [];
    sortables.forEach(sortable => {
      sortingOptions.push({"value": sortable, "label": sortable.replace('_', ' ')});
    });
    let sort = <Select className={"Sort"}
                   name={"sort"}
                   value={this.state["order_by"]}
                   onChange={this.handleSortChange.bind(this)}
                   options={sortingOptions}
                   multi={false}
                   placeholder={"Sort"}>
               </Select>;
    let direction = <Toggle defaultChecked={this.state.directionToggleState}
                            onChange={this.handleDirectionChange.bind(this)}
                            className={"Direction"}/>
    return (
        <div>
          <Page>
            <div>{selects}</div>
            <div className={"Menu"}>{sort}{direction}<p className={"SortLabel"}>asc | desc</p></div>
            <CardGrid entities={this.state.entities}
                      endpoint={this.props.endpoint}
                      page={this.state.page}
                      imageHeight={this.props.imageHeight}/>
            <Pagination classes={"Pagination"}>
              {this.state.pagination}
            </Pagination>
          </Page>
        </div>
    );
  }
}

export default GridPage;
