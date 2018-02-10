
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
	.travis.yml                           \
	parksrus-tests					      \
	parksrus-tests/aish12-RunCollatz.out   \

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

RunCollatz.pyx: Collatz.py RunCollatz.py .pylintrc
	-mypy      RunCollatz.py
	-$(PYLINT) --reports=yes --disable=RP0001 --disable=RP0002 --disable=RP0003 --disable=RP0101 --disable=RP0401 --disable=RP0701 --disable=RP0801 RunCollatz.py
	./RunCollatz.py < RunCollatz.in > RunCollatz.tmp
	-diff RunCollatz.tmp RunCollatz.out

TestCollatz.pyx: Collatz.py TestCollatz.py .pylintrc
	-mypy      TestCollatz.py
	-$(PYLINT) --reports=yes --disable=RP0001 --disable=RP0002 --disable=RP0003 --disable=RP0101 --disable=RP0401 --disable=RP0701 --disable=RP0801 TestCollatz.py
	-coverage  run    --branch TestCollatz.py
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

run: RunCollatz.pyx TestCollatz.pyx

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

travis: parksrus-tests parksrus.html parksrus.log
	make clean
	ls -al
	make run
	ls -al
	make -r check