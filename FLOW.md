# selekta
A set of tools to keep you sane when organising your music selection. The core idea of selekta is to fetch all the tracks in your neatly organized selection folders or playlists, save the way these tracks where organized (starting from a selected root folder) and move the files to a vault folder. This way you can easily manage a wide variety of differently organized track selections. To summarize, it alllows you to: 
  - Saves space (since folder organisation is saved in a database there's no need to have multiple copies of the same .WAV file) 
  - See how you've organized a given track in the past
  - Quickly apply a new organization to previously selected tracks. 

# components
- Track Organization Database : Elasticsearch node
- Webserver to serve the API and React app (Apache)
- Symlink to vault folder (to expose the audio files to the app)
- API (PHP) that provides a connection with:
  - Folder crawler (which crawls through a given folder and indexed audio tracks and their organization)
  - Backend logic to shape the Track Organization Database
- React app
- Rsync

# flow
1. Tracks are named in a certain fashion, so the crawler in the API can understands the properties of a track.
2. A master copy of each track should be stored inthea VAULT, an unstructed folder with all tracks in the root
3. Whenever a structured selection of tracks (nested in any number of levels) is analyzed, it is stored as a DOCUMENT. A DOCUMENT contain the nested folder structure (saved under the name of the analyzed folder) and information about the track such as (artist, bpm, key etc.) is saved along with it.
4. This DOCUMENT is send as XHR POST request to the API
5. The API communicates with the Elasticsearch node and inserts the document(s) in an index named 'vault'. 
6. Exploring this VAULT, a rich library of info about your selected tracks and how they are organized, can be done through the React App
7. Ultimately a new structured folder can be created through the API:
    a. Various endpoints are provided to generate bash scripts. A bash script point to the master copies of track in the vault as the source, and copies them to the desired (for instance the earlier analyzed folder structure) new folder.