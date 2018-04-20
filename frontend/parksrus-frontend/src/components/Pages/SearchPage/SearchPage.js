import React, { Component } from 'react';


import './SearchPage.css'
import { Pagination, Form, FormGroup, FormControl, Panel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Page from '../../Page/Page'
import axios from 'axios'
import { RingLoader } from 'react-spinners';

const Highlight = require('react-highlighter');

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      page: 1,
      pagination: [],
      value: "",
      endpoints: ['cities', 'parks', 'snapshots'],
      loading: false
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
        + this.state.value
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
    this.setState({ loading: true});
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
        pagination: pagination,
        loading: false
      })
    }));
  }

  getBadgeColorClassName(tag) {
    const badgeClasses = ['OrangeBadge', 'RedBadge', 'BlueBadge'];
    if (this.state.value === tag) {
      return "YellowBadge"
    } else {
      return badgeClasses[Math.floor(Math.random() * badgeClasses.length)];
    }
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
    let searchFields = ['name', 'park', 'city', 'state', 'description', 'tags', 'num_parks', 'review_data', 'views'];
    let searchCards = [];

    for (let entity of this.state.entities) {
      let attributes = [];
      if (entity.hasOwnProperty('image_uri')) {
        attributes.push(<img src={entity['image_uri']} />)
      }
      let fields = [];
      for (let field of searchFields) {
        if (entity.hasOwnProperty(field)) {
          if (field === 'description') {
            fields.push(<Highlight search={this.state.value}>{this.getSubstring(entity[field].toLowerCase(), 50, this.state.value.toLowerCase())}</Highlight>)
          } else if (field === 'name') {
            fields.push(<h3><Highlight search={this.state.value}>{entity[field]}</Highlight></h3>)
          } else if (field === 'city') {
            fields.push(<h3><Highlight search={this.state.value}>{entity[field].name}</Highlight></h3>)
          } else if (field === 'state') {
            fields.push(<h4><Highlight search={this.state.value}>{entity[field]}</Highlight></h4>)
          } else if (field === 'park') {
            fields.push(<h4><Highlight search={this.state.value}>{entity[field].name}</Highlight></h4>)
          } else if (field === 'num_parks') {
            fields.push(<div><h3>{entity[field]}</h3><p>Total Parks</p></div>);
          } else if (field === 'review_data') {
            fields.push(<div><h3>{entity[field]}</h3><p>Avg. Rating</p></div>);
          } else if (field === 'views') {
            fields.push(<div><h3>{entity[field]}</h3><p>Views</p></div>);
          } else if (field === 'tags') {
            fields.push(<p>{entity[field].split(',').map(tag => <Badge className={this.getBadgeColorClassName(tag)}>{"#" + tag}</Badge>)}</p>);
          }
        }
      }
      attributes.push(<div className={"SearchFields"}>{fields}</div>);
      let card = <Panel className={"SearchResult"}><Link to={'/' + entity.type + '/' + entity.id} className={"CardLink"}>{attributes}</Link></Panel>
      if (fields.length > 0) {
        searchCards.push(card);
      }
    }
    if (!this.state.loading && searchCards.length === 0 && this.state.value.length > 0) {
      searchCards.push(<Panel className={"NoResults"}><i className={"material-icons"}>error</i><h4>Oops! Looks like our database ran off the rails...we couldn't find any results for the provided query.</h4></Panel>)
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
            <div className={"SearchResults"}>
              {searchCards}
              <RingLoader color={"red"}
                          loading={this.state.loading}
                          className={"LoadingAnimation"}
              />
            </div>
            <Pagination classes={"Pagination"}>
              {this.state.pagination}
            </Pagination>
          </Page>
        </div>
    );
  }
}

export default SearchPage;
