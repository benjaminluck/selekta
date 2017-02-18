# selekta
A set of tools to keep you sane when organising your music selection

# todo
- Frontend: on dashboard page create a link that does a post to /API/create-vault
- Frontend: allow user to move items to other 'folders'
- Frontend: new temporary list, button that loops over all items and updates/saves all docs in ES
- API : check if directory exists before constructing
- refactor update scripting to use json (to push objects instead of strings)
- export ES selection to list.json
- add link to file (prettify path using new function)
- Cleanup /frontend/


# domains
- selekta
overview of music selections and library, tools to export folders
- selekta/mix
timelines per mixed file, users inserts (fade in timestamp, fade out timestamp, track name) and comments on how tracks blend.
all items are stored in elasticsearch index to link everything together.
- selekta/tap
simple webapp / ios app with bpm count by tap, swipe to different screens to see additional details: how much seconds 16/32/64 bars take at current bpm etc.
