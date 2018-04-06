import React, { Component } from 'react';

import './SearchPage.css'

import { Pagination, Form, FormGroup, FormControl, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Page from '../../Page/Page'
import axios from 'axios'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    let path = this.getBasicAPIPath();
    this.state = {
      entities: [],
      page: this.props.match.params.page || 1,
      pagination: [],
      value: "",
      endpoints: ['cities', 'parks', 'snapshots']
    }
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.setState({'page': props.match.params.page});
  }

  getBasicAPIPath() {
    return "http://parksr.us/api/search";
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
    //let searchQuery = this.getActiveSearchQuery();
    //let activePageQuery = this.getActivePageQuery(true);
    return apiPath //+ activePageQuery;
  }

  handlePaginationChange(page) {
    this.setState({ page: page });
  }

  getPagination(curPage, numPages, pageRange) {
    let pagination = [];
    pagination.push(<Pagination.First onClick={this.handlePaginationChange(1)}>{"<<"}</Pagination.First>);
    pagination.push(<Pagination.Prev onClick={this.handlePaginationChange(curPage - 1)}>{"<"}</Pagination.Prev>);
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
        pagination.push(<Pagination.Item onClick={this.handlePaginationChange(prevPage)}>{prevPage}</Pagination.Item>)
        prevPage += 1;
        pRange += 1;
      }
    }
    if (curPage > 1) {
      pagination.push(<Pagination.Item className={"active"} onClick={this.handlePaginationChange(curPage)}>{curPage}</Pagination.Item>);
    }
    if (curPage < numPages) {
      let nextPage = curPage + 1;
      let pRange = 0;
      while (nextPage != numPages && pRange < pageRange) {
        let k = nextPage;
        pagination.push(<Pagination.Item onClick={this.handlePaginationChange(nextPage)}>{nextPage}</Pagination.Item>);
        nextPage += 1;
        pRange += 1;
      }
    }
    if (numPages - curPage >= 5) {
      pagination.push(<Pagination.Ellipsis />);
    }
    if (curPage != numPages) {
      pagination.push(<Pagination.Item onClick={this.handlePaginationChange(numPages)}>{numPages}</Pagination.Item>);
    }
    pagination.push(<Pagination.Next onClick={this.handlePaginationChange(curPage + 1)}>></Pagination.Next>);
    pagination.push(<Pagination.Last onClick={this.handlePaginationChange(numPages)}>>></Pagination.Last>);
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

  updateData() {
    console.log("updateData()")
    let path = this.getAPIPath();
    this.setState({
      apiPath: path
    }, function() {
      console.log("updated path:", this.state.apiPath);
      this.getData()
    })
  }

  componentDidMount() {
    this.getData();
  }

  getSearchAPIQuery(endpoint) {
    let path = this.getBasicAPIPath();
    path += "/" + endpoint + "?query=" + '"' + this.state.value + '"';
    path += this.getActivePageQuery(true);
    return path
  }

  getSearchAPIQueries() {
    let queries = [];
    for (let endpoint of this.state.endpoints) {
      let searchPath = this.getSearchAPIQuery(endpoint);
      queries.push(searchPath);
    }
    return queries;
  }

  search() {
    let searchQueries = this.getSearchAPIQueries();
    let entities = [];
    let numPages = [];
    const scope = this;
    axios.all(searchQueries.map(query => axios.get(query))).then(axios.spread(function(... response) {
      for (let r of response) {
        entities = entities.concat(r.data.objects);
        for (let v in entities) {
          if (entities[v].num_parks) {
            entities[v].type = "cities";
          } else if (entities[v].views) {
            entities[v].type = "snapshots";
          } else if (entities[v].review_data) {
            entities[v].type = "parks";
          }
        }
        numPages.push(r.data.total_pages);
      }
      //let pagination = scope.getPagination(scope.state.page, Math.min(...numPages), 2);
      scope.setState({
        entities: entities,
        numPages: Math.min(...numPages),
        //pagination: pagination
      }, function() {
        console.log(scope.state);
      })
    }))
  }

  handleSearchChange(e) {
    this.setState({ value: e.target.value }, function() {
      this.search();

    });
  }

  render() {
    let searchFields = ['description', 'name', 'state', 'tags'];
    let searchCards = [];
    for (let entity of this.state.entities) {
      let fields = [];
      if (entity.hasOwnProperty('image_uri')) {
        fields.push(<img src={entity['image_uri']} />)
      }
      for (let field of searchFields) {
        if (entity.hasOwnProperty(field) && entity[field].includes(this.state.value)) {
          fields.push(<p className={"mark"}>{entity[field]}</p>)
        } else {
          fields.push(<p>{entity[field]}</p>)
        }
      }
      let card = <Panel className={"SearchResult"}><Link to={'/' + entity.type + '/' + entity.id} className={"CardLink"}>{fields}</Link></Panel>

      searchCards.push(card);
    }
    let results = <div className={"SearchResults"}>{searchCards}</div>;
    return (
        <div>
          <Page>
            <Form className={"Search"}>
              <FormGroup bsSize={"large"}>
                <FormControl type={"text"}
                             onChange={this.handleSearchChange.bind(this)}
                             value={this.state.value}
                />
              </FormGroup>
            </Form>
            <div>{results}</div>
            {/*<Pagination classes={"Pagination"}>*/}
              {/*{this.state.pagination}*/}
            {/*</Pagination>*/}
          </Page>
        </div>
    );
  }
}

export default SearchPage;
