TEX_SOURCES := exercise-session.tex exercise-session-solutions.tex
PDFS := $(TEX_SOURCES:%.tex=build/%.pdf)

.DEFAULT_GOAL := all
.PHONY: all

all: $(PDFS)

build/%.pdf: %.tex exercise-style.tex ../vectors/exercise-style.tex .latexmkrc
	@mkdir -p build .latex-aux
	latexmk -pdf -interaction=nonstopmode -halt-on-error $<
	latexmk -c $<
	-@rmdir .latex-aux
