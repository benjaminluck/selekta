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
        "sort" : [
          {"artist" : {"order" : "asc"}}
        ]
}

GET selekta_db/mp3/_mapping


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
  "size": "5000",
  "query": {
    "bool":{
      "filter": {
        "terms": {
          "tags": [
            "big-room"
          ]
        }
      }
    }
  },
  "sort": [
    {
      "artist": {
        "order": "asc"
      }
    }
  ]
}

// all tracks matching 1A 123 Track - Title pattern
GET selekta_db/mp3/_search
{
    "query": {
        "regexp":{
            "fileName.keyword": "[0-9][A-Z] [0-9]{2,3} [A-z]+ - [A-Za-z ].*"
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

// tracks matching 12 Track - Title
GET selekta_db/mp3/_search
{
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

