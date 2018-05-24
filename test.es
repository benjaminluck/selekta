POST selekta_db/_update_by_query
{ 
    "script" : {
        "inline": "if(ctx._source.structure != null && ctx._source.structure[params.selectionName] != null) { ctx._source.structure.remove(params.selectionName) } ",
        "lang": "painless",
        "params" : {
            "selectionName" : "test"
        }
    }
}

GET selekta_db/_search
{
        "size": 5000,
        "sort" : [
          {"date_added" : {"order" : "desc"}}
        ]
    }

GET selekta_db/mp3/_mapping

PUT selekta_db/_mapping/mp3
{
  "properties": {
    "date_added": { 
      "type":     "text",
      "fielddata": true
    }
  }
}

GET selekta_db/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "track_analyzer.status": "success"
          }
        }
      ]
    }
  }
}

PUT selekta_db/_mapping/mp3
{
  "properties": {
    "tags": { 
      "field" : { "index" : "not_analyzed" }
    }
  }
}

PUT selekta_db/_mapping/mp3
{
  "properties": {
    "fileName": { 
      "field" : { "index" : "not_analyzed", "type" : "text" }
    }
  }
}

GET selekta_db/mp3/cc724b715e504c465610f2aacaf4e021

GET selekta_db/mp3/_search
{
  "size": "5000"
}

POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'unknown','pattern':'000']",
        "lang": "painless"
    }
}

// all tracks matching 1A 123B Tr4ck - L0ng - T1tl3 pattern
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9]{1,2}[A-Z] [0-9B]{2,4} [A-Za-z0-9&' ]+ - [A-Za-z0-9 ].*"
        }
    }
}



POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'success','pattern':'001-key_bpm_track_-_title']",
        "lang": "painless"
    },
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9]{1,2}[A-Z] [0-9B]{2,4} [A-Za-z0-9&' ]+ - [A-Za-z0-9 ].*"
        }
    }
}

// tracks matching 123Track - Title
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[A-Za-z ]+ - [A-Za-z ]+.*"
        }
    }
}

POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'mismatch','pattern':'002-track_-_title']",
        "lang": "painless"
    },
    "query": {
        "regexp":{
            "fileName.keyword": "[A-Za-z ]+ - [A-Za-z ]+.*"
        }
    }
}

// tracks matching 12 Track - Title
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[^0][0-9]{1,2} +[A-z0-9]+ - [A-Za-z ]+.*"
        }
    }
}

POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'mismatch','pattern':'003-bpm_track_-_title']",
        "lang": "painless"
    },
    "query": {
        "regexp":{
            "fileName.keyword": "[^0][0-9]{1,2} +[A-z0-9]+ - [A-Za-z ]+.*"
        }
    }
}

// single words
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[a-zA-Z].*"
        }
    }
}

POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'mismatch','pattern':'004-singlewords']",
        "lang": "painless"
    },
    "query": {
        "regexp":{
            "fileName.keyword": "[a-zA-Z].*"
        }
    }
}

// all tracks matching 1A 123 (FORMAT) Track - Title pattern
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9]{1,2}[A-Z] [0-9]{2,3} (\\([A-z]+\\)) [A-z& ]+ - [A-Za-z ].*"
        }
    }
}

POST selekta_db/_update_by_query
{
  "script" : {
        "inline": "ctx._source.track_analyzer = ['status':'success','pattern':'005-key_bpm_(FORMAT)_track_-_title']",
        "lang": "painless"
    },
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9]{1,2}[A-Z] [0-9]{2,3} (\\([A-z]+\\)) [A-z& ]+ - [A-Za-z ].*"
        }
    }
}

GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9]{1,2}[A-Z] [0-9B]{2,3} [A-z& ]+ - [A-Za-z ].*"
        }
    }
}