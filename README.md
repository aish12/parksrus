# parksrus

We want to connect theme park enthusiasts, trendy urbanites, and travel aficionados through a comprehensive web application that offers information on nearby amusement parks, rich social media of visitors’ experiences at the parks, and descriptions of their host cities.

### APIs

[Google Maps](https://developers.google.com/maps/)

[Twitter](https://developer.twitter.com/)

[Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)

[Flickr](https://www.flickr.com/services/api/)

### Tools

[Flask](http://flask.pocoo.org/)

[React-Bootstrap](https://react-bootstrap.github.io/)

[React](https://reactjs.org/)

[AWS EC2](https://aws.amazon.com/ec2/)

[Nginx](https://www.nginx.com/welcome-to-nginx/)

[TravisCI](https://travis-ci.org/)

[Gunicorn](http://gunicorn.org/)

[Create-React-App](https://github.com/facebook/create-react-app)

[Postman](https://www.getpostman.com/)

### Testing

[Mocha](https://mochajs.org/)

[Selenium](https://www.seleniumhq.org/)

## Core Structure 
    code
      ├── backend
      │   ├── cities.txt
      │   ├── city_scraper.py
      │   ├── config.py
      │   ├── flickr_scraper.py
      │   ├── hashtag_aggregator.py
      │   ├── main.py
      │   ├── models.py
      │   ├── park_scraper.py
      |   ├── scrape_tools.py
      │   └── tests.py
      │
      ├── frontend
      │   ├── parksrus-frontend
      │   │   ├── build
      │   │   ├── config
      │   │   ├── public
      │   │   ├── scripts
      │   │   └── src
      │   │   |
      │   │   ├── .babelrc
      │   │   ├── README.md
      │   │   ├── package-lock.json
      │   │   ├── package.json
      │   │   └── testSetup.js
      │   │
      |   ├── guitests.py
      |   ├── index.js
      │   └── tests.js
      │
      ├── images
      │   └── mobile-hero.jpg
      │
      ├── .coverage
      ├── .gitignore
      ├── .pylintrc
      ├── .travis.yml
      ├── Postman.json
      ├── README.md
      ├── UML.png
      ├── makefile
      └── requirements.txt
      

## Setup and Running
make setup    - sets up environment

make issues   - prints link to current phase's issues

make github   - prints link to github repo

make stories  - prints link to current phase's stories

make postman  - makes postman tests

make website  - prints link to a website

make apidoc   - prints link to api documentation

make report   - prints link to technical report

make mocha    - runs mocha tests

make backend  - runs backend tests

make selenium - runs selenium tests

make self     - prints link to self critique

make other    - prints link to other critique

make clean    - cleans up direcory of log and cache files

make sha      - prints the latest SHA

make githubid - prints Github ID of owner of repository

make reponame - prints Github repository name

make uml      - prints link to UML image

make check    - check if all files specified are present

make config   - runs git config -l

make format   - formats all Python code

make travis   - for Travis CI

make run      - runs the react app with npm start (http://localhost:3000)


### Image on Mobile
![ ](https://github.com/aish12/parksrus/blob/master/images/mobile-hero.jpg)

### Authors
Aishwarya Shashidhar - [GitHub](https://github.com/aish12)
Benjamin Chen - [GitHub](https://github.com/b-chen)
Daniel Zheng - [GitHub](https://github.com/danielczheng)
Denalex Orakwue - [GitHub](https://github.com/ChimdinduDenalexOrakwue)
Trenton Beckendorff - [GitHub](https://github.com/trentonbeckendorff)

## License
Copyright (c) 2018 Winter is Not Coming

