const mocker = require('mocker-data-generator').default
var util = require('util');

var car = {
    id: {
        chance: 'guid'
    },
    brand:{
         values: ['BMW', 'FIAT', 'FERRARI', 'AUDI', 'MASERATI']
    },
    //MODEL
    'object.brand=="BMW",model': {
        values: ['Serie 1', 'X5']
    },
    'object.brand=="FIAT",model': {
        values: ['500', '500 X Lounge']
    },
    'object.brand=="FERRARI",model': {
        values: ['Portofino', 'F40']
    },
    'object.brand=="AUDI",model': {
        values: ['Q7', 'A1']
    },
    'object.brand=="MASERATI",model': {
        values: ['Levante', 'MC 20', 'Ghibli']
    },
    //TYPE
    'object.model=="Serie 1" || object.model=="A1" || object.model=="500 X Lounge",type': {
        values: ['Berlina']
    },
    'object.model=="Q7" || object.model=="X5",type': {
        values: ['Jeep']
    },
    'object.model=="500",type': {
        values: ['CityCar']
    },
    'object.model=="X1" || object.model=="Levante",type': {
        values: ['SUV']
    },
    'object.model=="Ghibli" || object.model=="MC 20" || object.model=="Portofino" || object.model=="F40" ,type': {
        values: ['Sportiva']
    },
    //PRICE
     'object.model=="Serie 1",price': {
        values: ['27000']
    },
    'object.model=="X5",price': {
        values: ['67000']
    },
    'object.model=="500",price': {
        values: ['10900']
    },
    'object.model=="500 X Lounge",price': {
        values: ['21600']
    },
    'object.model=="Q7",price': {
        values: ['70000']
    },
    'object.model=="A1",price': {
        values: ['22000']
    },
    'object.model=="Levante",price': {
        values: ['75900']
    },
    'object.model=="MC 20",price': {
        values: ['200000']
    },
    'object.model=="Ghibli",price': {
        values: ['71000']
    },
    'object.model=="X1",price': {
        values: ['31800']
    },
    'object.model=="Portofino",price': {
        values: ['195000']
    },
    'object.model=="F40",price': {
        values: ['900000']
    },
    discount:{
        function: function(){
            return Math.floor(Math.random() * 20)
        }
    },
    image1:{
        values: ['']
    },
    image2:{
        values: ['']
    },
    image3:{
        values: ['']
    }
    
}

var user = {
    id: {
        chance: 'guid'
    },
    firstName: {
        faker: 'name.firstName'
    },
    lastName: {
        faker: 'name.lastName'
    },
    username: {
        function: function() {
            return (
                this.object.firstName.substring(0, 5) +
                this.object.lastName.substring(0, 3)
            )
        }
    },
    password:{
        function: function() {
            return (
                this.object.firstName.substring(0, 5) +
                this.object.lastName.substring(0, 3)
            )
        }
    },
    email:{
        function: function() {
            return (
                this.object.firstName.substring(0, 5) +
                this.object.lastName.substring(0, 3) + '@.email.com'
            )
        }
    },
    cars: {
        hasMany: 'cars',
        max: 5,
        min: 5
    },
    recentCars: {
        hasMany: 'cars',
        max: 10,
        min: 5
    },
    observedCars: {
        hasMany: 'cars',
        max: 10,
        min: 1
    },
    rating:{
        hasMany: 'ratings',
        min:10,
        max:20,
        get: 'rating'
    }
}

var rating = {
    rating:{
        faker: 'random.number({"min": 1, "max": 5})'
    }
}
mocker()
    .schema('cars', car, 30)
    .schema('ratings', rating, 20)
    .schema('users', user, 5)
    .build(function(error, data) {
        if (error) {
            throw error
        }
        console.log(util.inspect(data, { depth: 10 }))
      
    })