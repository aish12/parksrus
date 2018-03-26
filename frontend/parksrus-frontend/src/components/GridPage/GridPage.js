import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './GridPage.css';

import Page from '../Page/Page'
import CardGrid from '../CardGrid/CardGrid'
import axios from 'axios'

class GridPage extends React.Component {
  constructor(props) {
    super(props);
    let curPage = parseInt(this.props.page);
    let path = this.getAPIPath(this.props.endpoint, curPage);
    this.state = {
      entities: [],
      page: curPage,
      apiPath: path,
      pagination: []
    }
  }

  getAPIPath(endpoint, curPage) {
    const BASE_URL = "http://parksr.us/api/";
    return BASE_URL + this.props.endpoint + "?page=" + curPage;
  }

  getPagination(curPage, numPages, pageRange) {
    let endpoint = this.props.endpoint;
    let pagination = [];
    pagination.push(<Pagination.First><Link to={'/' + endpoint + '/pages/' + 1}/>{"<<"}</Pagination.First>);
    pagination.push(<Pagination.Prev><Link to={'/' + endpoint + '/pages/' + (curPage - 1)}/>{"<"}</Pagination.Prev>);
    if (numPages > 0) {
      let className = "";
      if (curPage == 1) {
        className = "active";
      }
    }
    if (curPage >= 5) {
      pagination.push(<Pagination.Ellipsis />);
    }
    if (curPage > 1) {
      let prevPage = curPage - pageRange;
      let pRange = 0;

      while (prevPage != curPage && pRange < pageRange) {
        console.log(prevPage > 0)
        let k = prevPage;
        pagination.push(<Pagination.Item><Link to={'/' + endpoint + '/pages/' + prevPage}>{prevPage}</Link></Pagination.Item>)
        prevPage += 1;
        pRange += 1;
      }
    }
    if (curPage > 1) {
      pagination.push(<Pagination.Item className={"active"}><Link to={'/' + endpoint + '/pages/' + curPage}>{curPage}</Link></Pagination.Item>);
    }
    if (curPage < numPages) {
      let nextPage = curPage + 1;
      let pRange = 0;
      while (nextPage != numPages && pRange < pageRange) {
        let k = nextPage;
        pagination.push(<Pagination.Item><Link to={'/' + endpoint + '/pages/' + nextPage}>{nextPage}</Link></Pagination.Item>);
        nextPage += 1;
        pRange += 1;
      }
    }
    if (numPages - curPage >= 5) {
      pagination.push(<Pagination.Ellipsis />);
    }
    if (curPage != numPages) {
      pagination.push(<Pagination.Item><Link to={'/' + endpoint + '/pages/' + numPages}>{numPages}</Link></Pagination.Item>);
    }
    pagination.push(<Pagination.Next><Link to={'/' + endpoint + '/pages/' + (curPage + 1)}>></Link></Pagination.Next>);
    pagination.push(<Pagination.Last><Link to={'/' + endpoint + '/pages/' + numPages}>>></Link></Pagination.Last>);
    return pagination;
  }

  getData(curPage, apiPath) {
    axios.get(apiPath).then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));
      let pagination = this.getPagination(curPage, response.data.total_pages, 2);
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
    this.getData(this.state.page, this.state.apiPath);
  }

  componentWillReceiveProps(props) {
    this.props = props;
    let curPage = parseInt(this.props.page);
    let path = this.getAPIPath(this.props.endpoint, curPage);
    this.setState(
        {
          page: curPage,
          pagination: [],
          apiPath: path
        });
    this.getData(curPage, path);
  }

  render() {
    return (
        <div>
          <Page>
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
