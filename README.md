# selekta
A set of tools to keep you sane when organising your music selection

# todo
- Cleanup /frontend/
- API : check if directory exists before constructing
- API: save folder structure in array from shallow > deep ['/A','/0','innerDirectory']
- es queries using json instead of php array
- refactor update scripting to use json (to push objects instead of strings)
- export ES selection to list.json
- add link to file (prettify path using new function)


# domains
- selekta
overview of music selections and library, tools to export folders
- selekta/tap
simple webapp / ios app with bpm count by tap, swipe to different screens to see additional details: how much seconds 16/32/64 bars take at current bpm etc.
- selekta/mix
timelines per mixed file, users inserts (fade in timestamp, fade out timestamp, track name) and comments on how tracks blend.
all items are stored in elasticsearch index to link everything together.
