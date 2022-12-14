# Data feed

A company is building a system for managing data feeds inputs from external sources. <br>
Data feed is a collection of data that has keys and values ordered according to specific
structure. <br>
Each source has a different way to login and extract the relevant data feed. <br>
User can filter data using display options sidebar or update field value with new value.

## Design

The user should be logged into the system to view the data feed.

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940886/wg7sdygutef3ivwoixwo.png
)

It means that the user can see only one feed at a time. <br>

<b> User's table: </b> <br>
user_id (Primary key) <br>
username <br>
pwd - password (in order to enable login functionality) <br>
email <br>
created_on - creation time of the user <br>
last_login (might be helpful in future feature, for example - token refresh) <br>

<ins> Note: </ins> <br>
in the future, there will be secured login using token. This change will required adding token to user's table. Token will be generated as hash of email & password. The pwd (user's password) that is saved in DB will be encrypted. It means that in login implemention, the server should decrypt the saved password from DB in order to compare it to the sent password by client. If passwords are equal, server returns success, otherwise - failure. On login implemention we also need to consider the case where email & password exist in DB but the token expired, then server need to generate new one and user should be able to login with the new token. (client should support updating token on his side).

<b> Feed's table: </b> <br>
feed_id (Primary key) <br>
user_id (foriegn key, references user table) <br>
updated_on - timestamp that represents the last time the feed was updated <br>
feed_data - json that represnts the data of the feed <br>


![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1666027394/fkcssttopv7o83mgd3ll.png
)

## Workflow

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1666006730/xmgthwfaildm4bg8xvra.jpg
)

## Prerequisites
The following technologies should be installed globally
* Node (preferred version / project version - 14.15.3)
* ts-node
* TypeScript (latest)
* Nodemon 
* PostgreSQL


Get a key from this site (or use the one I supplied)
```
https://aviationstack.com/
```

## Installation

Before running this project install node modules with this command:

```
npm install
```



## API
<ins><b>1) Get data feed </ins></b> <br>
Retrieves feed from an external source.<br>
POST - http://localhost:9000/api/feed

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665951016/mdz2ihw6ikngfwyw4ylf.png
)

Try using curl:

```
curl --location --request POST 'http://localhost:9000/api/feed' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3ATgv3GUfYzw7-EcNOhnaJVjy8NVcg5aWH.ZlJHeqmwkwnVIWzj0tENzz61oy2%2FiLbLnv0NRvC6CiI' \
--data-raw '{
    "source": "http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=5"
}'
```

In case the source is not supplied by the client, the server returns an error.

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665951480/cp5dzszhrxd9mwsi9dgs.png
)

<ins><b>2) Filter feed </ins></b> <br>
Filters are based on a specific filter.<br>
Supported filters: <br>
- Limit results - choose the number of rows you want to see in the feed. <br>
- Show specified columns - choose which columns you want to see in the feed <br> <br>
<ins> Note:</ins> 
* You can choose one of the following filters or both. <br>
* Filters like contains, greater than, lower than, will be implemented in the future.

POST - http://localhost:9000/api/feed/filter <br>

An example of both filters applied:
![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665952095/jlhyxpytrgz4cyedzrnh.png
)

Try using curl:

```
curl --location --request POST 'http://localhost:9000/api/feed/filter' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AcwpJbF2WrTLlpin0cGFs_9d2fsyQAW2D.a%2FMWgd3wloyb7TWyrBnCSEkhwroRWd1bQbJ4dR2hUcM' \
--data-raw '{
    "filters": {
        "columns": ["flight"],
        "limit": 1
    }
}'
```

In case no column is sent, the filter(s) is ignored since there is no way to filter an empty set of data ??? this scenario is equal to not sending a request at all, and in a real-world system, the client should prevent it from going out. It is added here as a safeguard
If the body of the request is empty, the server returns an error.


![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665952367/hogscsbevd11prjbbc1e.png
)

If the body of the request is plain, server returns error <br>
![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665952625/ry3xoabyj25j7jzanw4s.png
)

Show only flight date & flight status columns:

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665952958/y7yt4olnkf75bforw3k9.png
)

<ins><b>3) Update field </ins></b> <br>
You can update field by passing the field name you want to alter & the new value. <br>
<ins> Note: </ins> currently this feature updating row & multiple rows of specific column. <br> <br>
POST - http://localhost:9000/api/feed/updateField <br>

Let's say we want to update the first row (first record) with a new value for the field "live". <br>
Original field equals null as you can see: <br>

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665963184/bftz3y8ro86dsy2uqlnx.png
)

After sending the request to the server, you will notice the value is altered to 5.

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665963225/bbxeqsfr7m7wkv1vh3cy.png
)

Try using curl:

```
curl --location --request POST 'http://localhost:9000/api/feed/updateField' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AwIcv2CWOo4MfACEOzmeyAcOHIOjz0JI-.NVuIKBNKBIAh1%2F7CVQD9d4khNV6pFOqZBSlfCdJGGK0' \
--data-raw '{
    "data": {
        "rowId": 1,
        "fieldToUpdate": "live",
        "newValue": "5"
    }
}''
```


All data fields should be supplied. Otherwise, the server returns an error.
![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665963344/l8eezirjrzrpuxhtxfrx.png
)
