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


.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

all:

check: $(FILES)

clean:
	
config:
	git config -l

format:
	autopep8 -i *.py

run: 
scrub:
	make clean
	

status:
	make clean
	@echo
	git branch
	git remote -v
	git status
