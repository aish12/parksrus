.DEFAULT_GOAL := all
.PHONY: backend

PYLINT_VERSION = $(shell pylint --version | grep Python)
ifneq (, $(findstring Python 2, $(PYLINT_VERSION)))
	PYLINT = pylint3
else
	PYLINT = pylint
endif

FILES1 :=                \
	backend/main.py      \
	backend/config.py    \
	backend/models.py    \
	backend/tests.py     \
	frontend/tests.js	 \
	Postman.json		 \
	backend				 \
	frontend			 \

GithubID = aish12
RepoName = parksrus
SHA = 00000000000000000

all:

clean:
	rm -f  *.log
	rm -f  backend/*.pyc
	rm -f  frontend/*.pyc
	rm -rf backend/__pycache__

# make sha
sha:
	@echo "${SHA}"

# make githubid
githubid:
	@echo "${GithubID}"

# make reponame
reponame:
	@echo "${RepoName}"

# make uml
uml:
	@echo "https://imgur.com/pzR2jbG"

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

# make check
check: $(FILES)
	
# make config
config:
	git config -l

# make format - formats python code
format:
	autopep8 -i backend/*.py
	autopep8 -i frontend/*.py

# make setup - sets up environment
setup:
	pip install -r requirements.txt
	npm install -g newman
	
# make status - prints git status
status:
	make clean
	@echo
	git branch
	git remote -v
	git status

# make issues   - prints link to current phase's issues
issues:
	@echo "https://github.com/aish12/parksrus/issues"

# make github   - prints link to github repo
github:
	@echo "https://github.com/aish12/parksrus"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://github.com/aish12/parksrus/labels/story"

# make postman - makes postman tests
postman:
	- npm install -g newman
	newman run Postman.json

# make website  - prints link to a website
website:
	@echo "http://www.parksr.us/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://legacy.gitbook.com/book/aish12/api/"

# make report   - prints link to technical report
report:
	@echo "https://legacy.gitbook.com/book/aish12/report/"

# make mocha - runs mocha tests
mocha:
	cd frontend/parksrus-frontend && npm install
	cd frontend/parksrus-frontend/src && npm test

# make backend  - runs backend tests
backend: backend/tests.py
	- cd backend && python tests.py

# make selenium - runs selenium tests
selenium: frontend/guitests.py
	- cd frontend && python guitests.py

# make self     - prints link to self critique
self:
	@echo "https://aish12.gitbooks.io/report/content/critiques.html"

# make other    - prints link to other critique
other:
	@echo "https://aish12.gitbooks.io/report/content/critiques.html"

travis: backend frontend
	make clean
	ls -al
	make backend
	ls -al
	make mocha
	ls -al
	make postman
	ls -al
	make -r check