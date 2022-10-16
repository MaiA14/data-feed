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

<b> Feed's table: </b> <br>
feed_id (Primary key) <br>
user_id (foriegn key, references user table) <br>
updated_on - timestamp that represents the last time the feed was updated <br>
feed_data - json that represnts the data of the feed <br>


![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940985/asyjte1jsybiicre2g3l.png
)

## Workflow

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665950544/a80t1375bblijwnowypn.jpg
)


## Endpoints
<ins><b> 1) Get feed data </ins></b> <br>
Retrieves feed according external source.<br>
POST - http://localhost:9000/api/feed

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665951016/mdz2ihw6ikngfwyw4ylf.png
)

Try using curl:

```
curl --location --request POST 'http://localhost:9000/api/feed' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3ATgv3GUfYzw7-EcNOhnaJVjy8NVcg5aWH.ZlJHeqmwkwnVIWzj0tENzz61oy2%2FiLbLnv0NRvC6CiI' \
--data-raw '{
    "source": "http://api.aviationstack.com/v1/flights?access_key=1d5da03a0ead670aa12f88e6031ad791&limit=5"
}'
```

## Installation

Before running this project install node modules in both folders with this command:

```
npm install
```

create .env file with this variable in backend folder:

```
API_KEY=
```

Get a key from this site (or used the one I supplied)
```
https://aviationstack.com/
```

## Run project:
```
nodemon server.ts
```

or:
```
nodemon server.ts
```
<br> * nodemon running enables to run code in watch mode.