import React, { Component } from 'react';


import './SearchPage.css'
import { Pagination, Form, FormGroup, FormControl, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Page from '../../Page/Page'
import axios from 'axios'

const Highlight = require('react-highlighter');

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      page: 1,
      pagination: [],
      value: "",
      endpoints: ['cities', 'parks', 'snapshots']
    }
  }

  getBasicAPIPath() {
    return "http://parksr.us/api/search";
  }

  getActivePageQuery(complexQuery) {
    return (complexQuery ? "&":"?") + "page=" + this.state.page;
  }

  handlePaginationChange(page) {
    this.setState({ page: page }, function() { this.search(); });
  }

  getFirstPagination() {
    return [<Pagination.First onClick={this.handlePaginationChange.bind(this, 1)}>{"<<"}</Pagination.First>];
  }

  getPrevPagination(curPage) {
    return (curPage - 1 > 0) ? [<Pagination.Prev onClick={this.handlePaginationChange.bind(this, curPage - 1)}>{"<"}</Pagination.Prev>] : []
  }

  getLeftEllipsisPagination(curPage) {
    return (curPage >= 5) ? [<Pagination.Ellipsis />] : [];
  }

  getLeftPagination(curPage, pageRange) {
    let leftPagination = [];
    if (curPage > 1) {
      let prevPage = curPage - pageRange;
      let pRange = 0;
      while (prevPage !== curPage && pRange < pageRange) {
        if (prevPage > 0) {
          leftPagination.push(<Pagination.Item onClick={this.handlePaginationChange.bind(this, prevPage)}>{prevPage}</Pagination.Item>)
        }
        prevPage += 1;
        pRange += 1;
      }
    }
    return leftPagination;
  }

  getActivePagination(curPage) {
    return (curPage > 1) ? [<Pagination.Item className={"active"} onClick={this.handlePaginationChange.bind(this, curPage)}>{curPage}</Pagination.Item>] : []
  }

  getRightPagination(curPage, numPages, pageRange) {
    let rightPagination = [];
    if (curPage < numPages) {
      let nextPage = curPage + 1;
      let pRange = 0;
      while (nextPage !== numPages && pRange < pageRange) {
        rightPagination.push(<Pagination.Item onClick={this.handlePaginationChange.bind(this, nextPage)}>{nextPage}</Pagination.Item>);
        nextPage += 1;
        pRange += 1;
      }
    }
    return rightPagination;
  }

  getRightEllipsisPagination(curPage, numPages) {
    return (numPages - curPage >= 5) ? [<Pagination.Ellipsis />] : []
  }

  getNextPagination(curPage, numPages) {
    return (curPage + 1 <= numPages) ? [<Pagination.Next onClick={this.handlePaginationChange.bind(this, curPage + 1)}>></Pagination.Next>] : []
  }

  getLastPagination(numPages) {
    return [<Pagination.Last onClick={this.handlePaginationChange.bind(this, numPages)}>>></Pagination.Last>]
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

  getSearchAPIQuery(endpoint) {
    return this.getBasicAPIPath() + "/"
        + endpoint
        + "?query="
        + '"'
        + this.state.value
        + '"'
        + this.getActivePageQuery(true);
  }

  getSearchAPIQueries() {
    return this.state.endpoints.map(endpoint => this.getSearchAPIQuery(endpoint));
  }

  appendModelTypeToEntities(entities) {
    for (let v in entities) {
      if (entities[v].num_parks) {
        entities[v].type = "cities";
      } else if (entities[v].views) {
        entities[v].type = "snapshots";
      } else if (entities[v].review_data) {
        entities[v].type = "parks";
      }
    }
  }

  search() {
    let entities = [];
    let numPages = [];
    const scope = this;
    let searchQueries = this.getSearchAPIQueries();
    axios.all(searchQueries.map(query => axios.get(query))).then(axios.spread(function(... responses) {
      for (let response of responses) {
        entities = entities.concat(response.data.objects);
        scope.appendModelTypeToEntities(entities);
        numPages.push(response.data.total_pages);
      }

      let maxPages = Math.max(...numPages);
      let pagination = scope.getPagination(scope.state.page, maxPages, 2);
      scope.setState({
        entities: entities,
        numPages: maxPages,
        pagination: pagination
      })
    }))
  }

  handleSearchChange(e) {
    this.setState({ value: e.target.value }, function() { this.search(); });
  }

  getSubstring(input, n, search_val) {
    let start = input.search(search_val);
    let end = start + search_val.length;

    if (start - n > 0) {
      start = start - n;
    }

    if (end + n < input.length) {
      end = end + n;
    }

    return ".... " + input.substring(start, end) +  " .....";
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    let searchFields = ['name', 'state', 'description', 'tags'];
    let searchCards = [];
    for (let entity of this.state.entities) {
      let fields = [];
      if (entity.hasOwnProperty('image_uri')) {
        fields.push(<img src={entity['image_uri']} />)
      }
      for (let field of searchFields) {
        if (entity.hasOwnProperty(field)) {
          if (field === 'description') {
            fields.push(<Highlight search={this.state.value}>{this.getSubstring(entity[field].toLowerCase(), 15, this.state.value.toLowerCase())}</Highlight>)
          } else if (field === 'name') {
            fields.push(<h3><Highlight search={this.state.value}>{entity[field]}</Highlight></h3>)
          } else if (field === 'state') {
            fields.push(<h4><Highlight search={this.state.value}>{entity[field]}</Highlight></h4>)
          } else {
            fields.push(<Highlight search={this.state.value}>{entity[field]}</Highlight>)
          }
        }
      }

      let card = <Panel className={"SearchResult"}><Link to={'/' + entity.type + '/' + entity.id} className={"CardLink"}>{fields}</Link></Panel>
      if (fields.length > 0) {
        searchCards.push(card);
      }
    }
    if (searchCards.length === 0 && this.state.value.length > 0) {
      searchCards.push(<Panel><h4>We were unable to find any results matching your query.</h4></Panel>)
    }
    return (
        <div>
          <Page>
            <Form className={"Search"}>
              <FormGroup bsSize={"large"}>
                <FormControl type={"text"}
                             onChange={this.handleSearchChange.bind(this)}
                             value={this.state.value}
                             autoFocus={true}
                             onSubmit={this.handleSubmit}
                />
              </FormGroup>
            </Form>
            <div className={"SearchResults"}>{searchCards}</div>
            <Pagination classes={"Pagination"}>
              {this.state.pagination}
            </Pagination>
          </Page>
        </div>
    );
  }
}

export default SearchPage;
