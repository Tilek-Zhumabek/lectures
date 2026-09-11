# Shortcuts for the lecture site. Run these from this folder.
#
#   make          live preview, reloads on every save  (Ctrl+C to stop)
#   make teach    the deck with your speaker notes kept
#   make render   build _site/ once, the way publishing will
#   make stop     kill a preview left running by a closed window
#   make clean    delete the build output
#
# Why `stop` exists: the preview's real process is a deno child. Closing the
# terminal window without Ctrl+C leaves it holding the port, and the next
# preview then starts somewhere unexpected or serves stale pages.

.DEFAULT_GOAL := preview
.PHONY: preview teach render stop clean help

preview:
	quarto preview --port 4200

teach:
	quarto preview lectures/vectors/slides.qmd --profile teach --port 4201

render:
	quarto render

stop:
	@pkill -f "[q]uarto.js preview" 2>/dev/null && echo "preview stopped" || echo "nothing was running"

clean:
	rm -rf _site .quarto

help:
	@sed -n '3,8p' Makefile | sed 's/^# \{0,1\}//'
