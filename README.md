# Data feed

A company is building a system for managing data feeds input from external sources. <br>
Data feed is a collection of data that has keys and values ordered according to specific
structure. <br>
Each source has a different way to login and extract the relevant data feed. <br>
User can filter data using display options sidebar or update field value with new value.

## Design

User should be logged in in order to see feed data

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940886/wg7sdygutef3ivwoixwo.png
)

That's mean that user is able to see one feed at time. <br>

<b> User's table: </b> <br>
user_id (Primary key) <br>
username <br>
pwd - password (in order to enable login functionality) <br>
email <br>
created_on - creation time of the user <br>
last_login (might be helpful in future feature, for example - token refresh) <br>

<b> Feed's table </b> <br>
feed_id (Primary key) <br>
user_id (foriegn key, references user table) <br>
updated_on - timestamp to represent feed creation <br>
feed_data - json that represnts the data of the feed <br>


![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665940985/asyjte1jsybiicre2g3l.png
)

## Workflow

<b><ins> 1) Login (future feature)</ins></b> <br>

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665942815/gxlq5wjbok7nf67lkjfq.jpg
)

After implementing login endpoint on server side, all the requests will be passed with Bearer token, that will make sure the system is secured.

<b><ins> 2) Get data feed</ins></b> <br>
Now that user is logged in, he is able to display feed

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665943505/g4pxxfwa7bkntqqvcpmn.jpg
)

<b><ins> 3) Update record's field sepcifed by user </ins></b>

![Image](https://res.cloudinary.com/dtwqtpteb/image/upload/v1665944757/v4h8d50sbbw1muqqnepq.jpg
)

Future feature - support updating columns.



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