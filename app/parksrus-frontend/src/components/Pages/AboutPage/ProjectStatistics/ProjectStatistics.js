import React, { Component } from 'react';

import { Panel } from 'react-bootstrap'

import './ProjectStatistics.css'
import axios from 'axios/index';

function getRepositoryCommits() {
  return axios.get('http://api.github.com/repos/aish12/parksrus/stats/contributors');
}

function getRepositoryIssues() {
  return axios.get('http://api.github.com/repos/aish12/parksrus/issues');
}

function getTotalCommits(commits) {
  return commits.map(commit => commit.total)
  .reduce((previous, current) => previous + current);
}

function getTotalIssues(issues) {
  return issues.length;
}

class ProjectStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: 0,
      issues: 0,
      unittests: 0
    }
  }

  componentDidMount() {
    const scope = this;
    axios.all([getRepositoryCommits(), getRepositoryIssues()])
    .then(axios.spread(function(commits, issues) {
      console.assert(commits.hasOwnProperty('data'));
      console.assert(issues.hasOwnProperty('data'));

      scope.setState({
        commits: getTotalCommits(commits.data),
        issues: getTotalIssues(issues.data)
      });
    })).catch(function(error) {
      console.log(error);
      scope.setState({
        commits: 0,
        issues: 0,
        error: error
      });
    });
  }

  render() {
    return (
        <div className="ProjectStatistics">
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">{this.state.commits}</h1>
            <p>Total Commits</p>
          </Panel>
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">{this.state.issues}</h1>
            <p>Total Issues</p>
          </Panel>
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">{this.state.unittests}</h1>
            <p>Total Unit Tests</p>
          </Panel>
        </div>
    );
  }
}

export default ProjectStatistics;
