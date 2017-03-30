# selekta
A set of tools to keep you sane when organising your music selection

# todo
- IDEA: structure = { "selectionv-10" : ['A','1'] "selection-v2323" : --- etc }
- IDEA: structure by Elastic type
- Versions of files in /vault/
- Frontend: button to duplicate a selection
- Frontend: HTML5 audio player (how could this be possible? small API in media folder that serves the content? symlinks?)
- Frontend: multiple tag handling
- Backend: generate document id by artist + track hash
- Backend: determine bpmGroup property by given BPM
- Energy level rating
- Custom params
- Virtual repeat : https://material.angularjs.org/latest/demo/virtualRepeat

- API : check if directory exists before constructing
- refactor update scripting to use json (to push objects instead of strings)
- export ES selection to list.json
- add link to file (prettify path using new function)
- Cleanup /frontend/
- Frontend: new temporary list, button that loops over all items and updates/saves all docs in ES

# domains
- selekta
overview of music selections and library, tools to export folders
- selekta/mix
timelines per mixed file, users inserts (fade in timestamp, fade out timestamp, track name) and comments on how tracks blend.
all items are stored in elasticsearch index to link everything together.
- selekta/tap (selekta count) (count selekta)
simple webapp / ios app with bpm count by tap, swipe to different screens to see additional details: how much seconds 16/32/64 bars take at current bpm etc.


# cleanups
- the list and vault are now fetched from item [6] instead of a specified index name
