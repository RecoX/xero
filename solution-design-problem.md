The solution proposed requires 4 different modules plus a database to persist data. This document details what is needed to achieve the goal.

The reason of the use of the technologies proposed in this case is because with just one main language (Javascript/Typescript) we can build the entire system and the team does not need domain a vary of technologies, making it easy on induct people to start work on it.

# Modules needed:
a - Database, to storage all the data
b - Web API, the gateway to request or respond information to the different pieces of the system.
c - Flight Board Client, The big ticket board in the airports.
d - Webpage Client, The flight information needs to be viewable over the internet (so people can check their flight
status before coming to the airport)
e - Airport Manager, Part of the system where we can update the flight information.


### a - Database: The database suggested is MongoDB to storage the information of each flight
With the following schema:

```
{
  $flight: {
     required: [ "airline", "number", "destination", "scheduledDepartureTime", "status" ],
     properties: {
        airline: {
           bsonType: "string",
           description: "must be a string and is required"
        },
        number: {
           bsonType: "string",
           description: "must be a string and is required"
        },
        destination: {
           bsonType: "string",
           description: "must be a string and is required"
        },
        scheduledDepartureTime: {
           bsonType: "datetime",
           description: "must be a datetime and is optional"
        },
        estimatedDepartureTime: {
           bsonType: "datetime",
           description: "must be a datetime and is optional"
        },
        actualDepartureTime: {
           bsonType: "datetime",
           description: "must be a datetime and is optional"
        },
        status: {
            enum: [ "On Time", "Check In", "Boarding", "Departed", "Canceled", "Delayed" ],
            description: "can only be one of the enum values and is required."
        },
        departureGate: {
           bsonType: "string",
           description: "Assigned once the flight enters “Boarding” status. Is optional"
        },
     }
  }
}
```
### b- Web API: The web API is the part of the system which is in charge to respond to the differents modules of the system.

The stack proposed here is:
Javascript or Typrescript
Node.js / Express.js

This is a vital part of the system as is the only way all the applications can be populated with information and also the only way which all the different airlines can create and update flights.

The endpoints to get information of the flights should be public, so there is no need of a token/auth to see this information or subscribe to it. 

- One client using this will be the `Flight Board` in the airport.
- We can `subscribe` as a user through our `Webpage` to fligths to get information in real time about certains fligths.

This document propose to create endpoints to make http GET requests to obtain information of the flights and connect through sockets to get information of the flights in real time

The endpoints to manage/update information of flights should be validated with an Auth Token and also each Airline can see and edit information of his own flights through our Airport Manager.

Is required that the API has the at least following endpoints:

I- Endpoint to get information of the flights
`fligth/information/:flightNumber:`

II- Socket connection endpoint to manage information in real time for the subscription of the fligths in the Webpage. 
`fligth/subscription/:flightNumber:`

III- Endpoint with AUTH Token Validation to manager/update information of certain 
`fligth/edit/:flightNumber:`

We should send a POST request with the following information to update a flight:
```
    estimatedDepartureTime
    actualDepartureTime
    status
    departureGate
```

We should send an Authorization Token in the Header like this one:
`Authorization Bearer 70fc17b92e631886bc553dbc3b91a7cc`

If the Airline has access to edit the following flight we edit it and respond with a Http Code 200
If the Airline has not access to edit the fligth we respond with a 401
If the data provided is malformed we respond with 400
If there is an Error in the API we respond with 500

IV- Socket connection endpoint to receive information in real time for the incoming fligths. 
fligth/incoming/


### c- Flight Board Client
This part of the system is pretty straightforwared, it will be a client made in vanilla Javascript 
(open to proposals of the team to use UI libraries like React.js, Ember.js, Angular.js which the majoriy have expertise)

It should connect through socket to get information in real time from the API endpoint  `fligth/incoming-real-time/` and display it in the screen.

### d- Webpage Client
The technologies used for this module are:

- HTML5
- CSS
- Javascript
- React.js (or the one which the team has more expertise.)


```
The flight information needs to be viewable over the internet (so people can check their flight status before coming to the airport)
```

To solve this problem in our webpage we present this possible solutions

I- See all the incoming fligths through an http request to the web API:
`fligth/incoming/`.

(At difference of the `Flight Board Client` we don't use socket connection and instead an http request.)

II- Subscribe to a fligth to get information in real time about that particular flight and receive push notifications when it’s status or details change
`fligth/incoming/:fligthNumber`.


###e- Airport Manager, Part of the system where we can update the flight information.
The technologies used for this module are:

- HTML5
- CSS
- Javascript
- React.js (or the one which the team has more expertise.)


```
This part of the system cannot be accesed from internet
```

One possible solution to the requirement is mount the server with `Airport Manager` in his own network.
Open to discuss more in depth this option and search for others more scalables.


## Infraestructure:
All the modules are gonna be deployed (an exception for the `Airport Manager`) in cloud services using AWS ElasticBeanstalk which will give us the potential to scalate the computer power when must deal with very large traffic spikes for
when a storm or other event means lots of people check flight status.

Note: AWS ElasticSearch can be changed for another provider and service as selection of the company. (Azure, Google Cloud, etc.)


## Code Outh:
All the modules/projects will have linters to maintain an styleguide and cohesion of the code between members, personally I like `standard.js` but this decision is enterily up to the team.

Unit Test in critical parts of the system and use/implement it on the CI. Also to provide a suite of Integrations Test, apart from Unit Testing along with the CI.


## Estimates:

To make a real estimation we need to provide the following information:

- Quantity of members of the team working on it in the different areas/skills the project involves.




