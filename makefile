.DEFAULT_GOAL := all

PYLINT_VERSION = $(shell pylint --version | grep Python)
ifneq (, $(findstring Python 2, $(PYLINT_VERSION)))
    PYLINT = pylint3
else
    PYLINT = pylint
endif

FILES1 :=                                 \
	api.py 								  \
	config.py                     		  \
	models.py                             \
	server.py				\
	.travis.yml                           \
	parksrus-tests/RunParks.in		\
	parksrus-tests/RunParks.out		\

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

RunParksTests.pyx: DummyTest.py RunParksTests.py .pylintrc
	-mypy      RunParksTests.py
	-$(PYLINT) --reports=yes --disable=RP0001 --disable=RP0002 --disable=RP0003 --disable=RP0101 --disable=RP0401 --disable=RP0701 --disable=RP0801 RunParksTests.py
	./RunParksTests.py < RunParks.in > RunParks.tmp
	-diff RunParks.tmp RunParks.out

TestParks.pyx: DummyTest.py TestParks.py .pylintrc
	-mypy      TestParks.py
	-$(PYLINT) --reports=yes --disable=RP0001 --disable=RP0002 --disable=RP0003 --disable=RP0101 --disable=RP0401 --disable=RP0701 --disable=RP0801 TestParks.py
	-coverage  run    --branch TestParks.py
	-coverage  report -m

all:

check: $(FILES)

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache

config:
	git config -l

docker:
	docker run -it -v $(PWD):/usr/collatz -w /usr/collatz gpdowning/python

format:
	autopep8 -i *.py

run: RunParksTests.pyx TestParks.pyx

scrub:
	make clean
	rm -f  parksrus.html
	rm -f  parksrus.log
	rm -rf parksrus-tests

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

travis: parksrus-tests
	make clean
	ls -al
	make run
	ls -al
	make -r check