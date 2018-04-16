.DEFAULT_GOAL := all

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


.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

check: $(FILES)
	
config:
	git config -l

format:
	autopep8 -i backend/*.py

setup:
	pip install -r requirements.txt
	npm install -g newman
	
status:
	@echo
	git branch
	git remote -v
	git status

issues:
	@echo "https://github.com/aish12/parksrus/issues"

github:
	@echo "https://github.com/aish12/parksrus"

stories:
	@echo ""

postman:
	- npm install -g newman
	newman run Postman.json

website:
	@echo "http://www.parksr.us/"

apidoc:
	@echo "https://legacy.gitbook.com/book/aish12/api/"

report:
	@echo "https://legacy.gitbook.com/book/aish12/report/"

mocha:
	cd frontend && npm install
	cd frontend && npm test

backend:
	- cd backend && python tests.py

selenium:
	- cd frontend && python guitests.py