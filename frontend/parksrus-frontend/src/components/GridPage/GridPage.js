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
    this.state = {
      entities: [],
      endpoint: this.props.endpoint,
      page: parseInt(this.props.page),
      apiPath: "http://parksr.us" + "/api/" + this.props.endpoint + "?page=" + this.props.page,
      imageHeight: this.props.imageHeight,
      pagination: []
    }
  }

  getPages(page, numPages, pageRange) {
    console.log(page)
    let pages = [];
    pages.push(<Pagination.First><Link to={'/' + this.state.endpoint + '/pages/' + 1}/>{"<<"}</Pagination.First>);
    pages.push(<Pagination.Prev><Link to={'/' + this.state.endpoint + '/pages/' + (page - 1)}/>{"<"}</Pagination.Prev>);
    if (numPages > 0) {
      let className = "";
      if (page == 1) {
        className = "active";
      }
    }
    if (page >= 5) {
      pages.push(<Pagination.Ellipsis />);
    }
    if (page > 1) {
      let prevPage = page - pageRange;
      let pRange = 0;

      while (prevPage != page && pRange < pageRange) {
        console.log(prevPage > 0)
        let k = prevPage;
        pages.push(<Pagination.Item><Link to={'/' + this.state.endpoint + '/pages/' + prevPage}>{prevPage}</Link></Pagination.Item>)
        prevPage += 1;
        pRange += 1;
      }
    }
    if (page > 1) {
      pages.push(<Pagination.Item className={"active"}><Link to={'/' + this.state.endpoint + '/pages/' + page}>{page}</Link></Pagination.Item>);
    }
    if (page < numPages) {
      let nextPage = page + 1;
      let pRange = 0;
      while (nextPage != numPages && pRange < pageRange) {
        let k = nextPage;
        pages.push(<Pagination.Item><Link to={'/' + this.state.endpoint + '/pages/' + nextPage}>{nextPage}</Link></Pagination.Item>);
        nextPage += 1;
        pRange += 1;
      }
    }
    if (numPages - page >= 5) {
      pages.push(<Pagination.Ellipsis />);
    }
    if (page != numPages) {
      pages.push(<Pagination.Item><Link to={'/' + this.state.endpoint + '/pages/' + numPages}>{numPages}</Link></Pagination.Item>);
    }
    pages.push(<Pagination.Next><Link to={'/' + this.state.endpoint + '/pages/' + (page + 1)}>></Link></Pagination.Next>);
    pages.push(<Pagination.Last><Link to={'/' + this.state.endpoint + '/pages/' + numPages}>>></Link></Pagination.Last>);
    return pages;
  }

  getData() {
    console.log('Get Data')
    axios.get(this.state.apiPath).then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));
      let p = this.state.page;
      let pagination = this.getPages(p, response.data.total_pages, 2);
      this.setState({
        entities: response.data.objects,
        numPages: response.data.total_pages,
        pagination: pagination
      });
      console.log(pagination);
    }).catch(error => {
      console.error(error);
      this.setState({
        error: error
      });
    })
  }

  componentDidUpdate(props) {
    console.log(props);
    console.log(this.props)
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(props) {
    this.props = props;
    // this.setState({
    //   page: this.props.page,
    //   apiPath: "http://parksr.us" + "/api/" + this.props.endpoint + "?page=" + this.props.page,
    //   pagination: []
    // });
    console.log(this.props);
    this.setState(
        {
          page: parseInt(this.props.page),
          pagination: [],
          apiPath: "http://parksr.us" + "/api/" + this.props.endpoint + "?page=" + this.props.page
        });
    this.getData();
  }

  render() {
    let endpoint = this.state.endpoint;
    let page = this.state.page;
    let numPages = this.state.numPages;

    //TODO: Rename photos endpoint to snapshots for consistency.
    return (
        <div>
          <Page>
            <CardGrid entities={this.state.entities}
                      endpoint={endpoint}
                      page={this.state.page}
                      imageHeight={this.state.imageHeight}/>

            <Pagination classes={"Pagination"}>
              {this.state.pagination}
            </Pagination>
          </Page>
        </div>
    );
  }
}

export default GridPage;
