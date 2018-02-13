import React, { Component } from 'react';
import DeveloperCard from '../../../DeveloperCard/DeveloperCard'
import axios from 'axios'
import './Developers.css';

const developers = new Map([
    [9554011,
      {
        "name": "Aishwarya Shashidhar",
        "githubUsername": "aish12",
        "avatarUrl": "./images/avatars/aish.jpg",
        "biography": "Aish Shashidhar is a Junior majoring in Computer Science at The University of Texas at Austin. She loves hiking andteaching, and is also a henna artist.",
        "responsibilities": "Back-End Developer",
        "unittests": 0
      }
    ],
    [14853878,
      {
        "name": "Benjamin Chen",
        "githubUsername": "b-chen",
        "avatarUrl": "./images/avatars/ben.jpg",
        "biography": "Benjamin Chen is Junior majoring in Computer Science at UT Austin. His interests outside of academics include videogames and fishing. ",
        "responsibilities": "Front-End Developer",
        "unittests": 0
      }
    ],
    [15369024,
      {
        "name": "Daniel Zheng",
        "githubUsername": "danielczheng",
        "avatarUrl": "./images/avatars/daniel.png",
        "biography": "Daniel Zheng is a Junior studying Computer Science at the University of Texas Austin. Aside from academia, he enjoys spending his time playing videogames, and watching the occasional show or movie. He also has a newfound passion for playing squash (the sport, not the vegetable).",
        "responsibilities": "Front-End Developer",
        "unittests": 0
      }
    ],
    [12850078,
      {
      "name": "Denalex Orakwue",
      "githubUsername": "chimdindudenalexorakwue",
      "avatarUrl": "./images/avatars/denalex.jpg",
      "biography": "Denalex Orakwue is a Junior majoring in Computer Science at The University of Texas at Austin.",
      "responsibilities": "Back-End Developer",
      "unittests": 0
      }
    ],
    [23325303,
      {
      "name": "Trenton Beckendorff",
      "githubUsername": "trentonbeckendorff",
      "avatarUrl": "./images/avatars/trenton.jpg",
      "biography": "Trenton Beckendorff is an emerging technologist pursuing a degree in Computer Science from The University of Texas at Austin.",
      "responsibilities": "Front-End Developer",
      "unittests": 0
      }
    ]
]);

function getRepositoryCommits() {
  return axios.get('http://api.github.com/repos/aish12/parksrus/stats/contributors');
}

function getRepositoryIssues() {
  return axios.get('http://api.github.com/repos/aish12/parksrus/issues');
}

function addContributions(developers, commits, issues) {
  console.assert(developers.size === commits.length);
  commits.forEach(function attributeCommits(commit) {
    console.assert(commit.hasOwnProperty('author'));
    console.assert(commit.author.hasOwnProperty('id'));
    const githubID = commit.author.id;
    developers.get(githubID).commits = commit.total;
    console.assert(developers.get(githubID).commits > 0);
  });

  issues.forEach(function attributeIssues(issue) {
    console.assert(issue.hasOwnProperty('user'));
    console.assert(issue.user.hasOwnProperty('id'));
    const githubID = issue.user.id;
    if ('issues' in developers.get(githubID)) {
      developers.get(githubID).issues++;
    } else {
      developers.get(githubID).issues = 1;
    }
    console.assert(developers.get(githubID).issues > 0);
  });
  return developers;
}

class Developers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      commits: [],
      issues: [],
      developers: developers
    };
  };

  componentDidMount() {
    const scope = this;
    axios.all([getRepositoryCommits(), getRepositoryIssues()])
    .then(axios.spread(function(commits, issues) {
      console.assert(commits.hasOwnProperty('data'));
      console.assert(issues.hasOwnProperty('data'));
      scope.setState({
        isLoaded: true,
        developers: addContributions(developers, commits.data, issues.data)
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
    const { error, isLoaded, developers } = this.state;
    const devs = Array.from(developers.values());
    const devProfiles = devs.map((dev) =>
        <DeveloperCard name={dev.name}
                       avatarUrl={dev.avatarUrl}
                       biography={dev.biography}
                       responsibilities={dev.responsibilities}
                       commits={dev.commits | 0}
                       issues={dev.issues | 0}
                       unittests={dev.unittests | 0}>
        </DeveloperCard>
    );
    if (error) {
      console.error(error)
    }
    return devProfiles;
  }
}

export default Developers;
