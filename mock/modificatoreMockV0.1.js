var fs = require("fs");

  cars = [
    {
      "id": "f246798c-9a05-5f8f-b73e-08a8a38c819a",
      "brand": "MASERATI",
      "model": "Ghibli",
      "type": "Sportiva",
      "price": "71000",
      "discount": 10,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
      "brand": "BMW",
      "model": "Serie 1",
      "type": "Berlina",
      "price": "27000",
      "discount": 4,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
      "brand": "FERRARI",
      "model": "F40",
      "type": "Sportiva",
      "price": "900000",
      "discount": 13,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
      "brand": "FERRARI",
      "model": "Portofino",
      "type": "Sportiva",
      "price": "195000",
      "discount": 14,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "036d0b95-1372-5af6-b071-b9b358d249c7",
      "brand": "AUDI",
      "model": "Q7",
      "type": "Jeep",
      "price": "70000",
      "discount": 14,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "8261a518-4053-52d5-9f60-5651cf77060f",
      "brand": "FERRARI",
      "model": "Portofino",
      "type": "Sportiva",
      "price": "195000",
      "discount": 0,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "ba089030-32a9-52e7-ad94-902d23a97972",
      "brand": "FIAT",
      "model": "500 X Lounge",
      "type": "Berlina",
      "price": "21600",
      "discount": 0,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "0e90f9ba-0082-56b6-a688-41f2a37b6463",
      "brand": "BMW",
      "model": "X5",
      "type": "Jeep",
      "price": "67000",
      "discount": 18,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "52c13f87-bd1c-5fd0-8614-3507e9434e18",
      "brand": "BMW",
      "model": "X5",
      "type": "Jeep",
      "price": "67000",
      "discount": 16,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "7f9419bc-ec3c-5a3b-9945-95c22508c728",
      "brand": "AUDI",
      "model": "A1",
      "type": "Berlina",
      "price": "22000",
      "discount": 7,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "5ad636b0-becb-5b5a-99a6-2f90d8a9b47b",
      "brand": "FIAT",
      "model": "500",
      "type": "CityCar",
      "price": "10900",
      "discount": 19,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "29c7221a-480b-5105-87c8-060b292c48ee",
      "brand": "AUDI",
      "model": "A1",
      "type": "Berlina",
      "price": "22000",
      "discount": 15,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
      "brand": "FIAT",
      "model": "500",
      "type": "CityCar",
      "price": "10900",
      "discount": 10,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "991759a9-d62a-5dd1-bf1a-0d1f16756cc5",
      "brand": "FERRARI",
      "model": "Portofino",
      "type": "Sportiva",
      "price": "195000",
      "discount": 3,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
      "brand": "FIAT",
      "model": "500 X Lounge",
      "type": "Berlina",
      "price": "21600",
      "discount": 4,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "962712d1-14c5-56ff-aa7f-c5e91ab4ee3a",
      "brand": "BMW",
      "model": "X5",
      "type": "Jeep",
      "price": "67000",
      "discount": 11,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "349f396c-c3f2-5eb5-baa3-2c49404330c3",
      "brand": "AUDI",
      "model": "A1",
      "type": "Berlina",
      "price": "22000",
      "discount": 9,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "5ac5b398-4939-544b-8bda-1d359c627884",
      "brand": "FERRARI",
      "model": "Portofino",
      "type": "Sportiva",
      "price": "195000",
      "discount": 0,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "ee881a8c-a3e0-51a2-8375-753840205051",
      "brand": "FIAT",
      "model": "500",
      "type": "CityCar",
      "price": "10900",
      "discount": 16,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "bec37440-ec11-503d-9864-f448cb1724f0",
      "brand": "BMW",
      "model": "X5",
      "type": "Jeep",
      "price": "67000",
      "discount": 14,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
      "brand": "MASERATI",
      "model": "Ghibli",
      "type": "Sportiva",
      "price": "71000",
      "discount": 13,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "765153f1-0c59-5ac0-9b9c-3c5878faca7f",
      "brand": "MASERATI",
      "model": "MC 20",
      "type": "Sportiva",
      "price": "200000",
      "discount": 13,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "9032ff3c-6e81-52b8-95bb-a9051f951cc1",
      "brand": "FERRARI",
      "model": "F40",
      "type": "Sportiva",
      "price": "900000",
      "discount": 11,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
      "brand": "AUDI",
      "model": "A1",
      "type": "Berlina",
      "price": "22000",
      "discount": 3,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "dd909fd4-e02f-5cd1-bbc2-c1bc8e2b59e6",
      "brand": "MASERATI",
      "model": "MC 20",
      "type": "Sportiva",
      "price": "200000",
      "discount": 3,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "e3e9f8bf-9c71-5cea-a823-a65bc6176e26",
      "brand": "FIAT",
      "model": "500 X Lounge",
      "type": "Berlina",
      "price": "21600",
      "discount": 15,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
      "brand": "BMW",
      "model": "Serie 1",
      "type": "Berlina",
      "price": "27000",
      "discount": 10,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "22f5323e-bc52-5ce5-9544-b63ef1072239",
      "brand": "MASERATI",
      "model": "Levante",
      "type": "SUV",
      "price": "75900",
      "discount": 4,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "c39971ed-55aa-567d-86dc-106cce4bd96a",
      "brand": "BMW",
      "model": "Serie 1",
      "type": "Berlina",
      "price": "27000",
      "discount": 8,
      "image1": "",
      "image2": "",
      "image3": ""
    },
    {
      "id": "5ca77b3c-a0c5-5295-8975-fe44cbd17358",
      "brand": "BMW",
      "model": "X5",
      "type": "Jeep",
      "price": "67000",
      "discount": 11,
      "image1": "",
      "image2": "",
      "image3": ""
    }
  ],
  ratings = [
    {
      "rating": 4
    },
    {
      "rating": 3
    },
    {
      "rating": 5
    },
    {
      "rating": 2
    },
    {
      "rating": 2
    },
    {
      "rating": 5
    },
    {
      "rating": 2
    },
    {
      "rating": 1
    },
    {
      "rating": 2
    },
    {
      "rating": 4
    },
    {
      "rating": 5
    },
    {
      "rating": 5
    },
    {
      "rating": 3
    },
    {
      "rating": 1
    },
    {
      "rating": 3
    },
    {
      "rating": 1
    },
    {
      "rating": 2
    },
    {
      "rating": 4
    },
    {
      "rating": 1
    },
    {
      "rating": 3
    }
  ],
  users = [
    {
      "id": "0b19329a-d85d-58e6-8da9-ee53a40505df",
      "firstName": "Stanford",
      "lastName": "Reilly",
      "username": "StanfRei",
      "password": "StanfRei",
      "email": "StanfRei@.email.com",
      "cars": [
        {
          "id": "dd909fd4-e02f-5cd1-bbc2-c1bc8e2b59e6",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "c39971ed-55aa-567d-86dc-106cce4bd96a",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 8,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "recentCars": [
        {
          "id": "991759a9-d62a-5dd1-bf1a-0d1f16756cc5",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "9032ff3c-6e81-52b8-95bb-a9051f951cc1",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 11,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "observedCars": [
        {
          "id": "7f9419bc-ec3c-5a3b-9945-95c22508c728",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 7,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "036d0b95-1372-5af6-b071-b9b358d249c7",
          "brand": "AUDI",
          "model": "Q7",
          "type": "Jeep",
          "price": "70000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ee881a8c-a3e0-51a2-8375-753840205051",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 16,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "7f9419bc-ec3c-5a3b-9945-95c22508c728",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 7,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "rating": [
        3,
        5,
        3,
        2,
        1,
        3,
        5,
        5,
        5,
        2,
        5,
        1
      ]
    },
    {
      "id": "45694e0c-81c5-5c4b-b291-5d431e469469",
      "firstName": "Joe",
      "lastName": "Vandervort",
      "username": "JoeVan",
      "password": "JoeVan",
      "email": "JoeVan@.email.com",
      "cars": [
        {
          "id": "5ad636b0-becb-5b5a-99a6-2f90d8a9b47b",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 19,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "29c7221a-480b-5105-87c8-060b292c48ee",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 15,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "recentCars": [
        {
          "id": "dd909fd4-e02f-5cd1-bbc2-c1bc8e2b59e6",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8261a518-4053-52d5-9f60-5651cf77060f",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 0,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "5ac5b398-4939-544b-8bda-1d359c627884",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 0,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "0e90f9ba-0082-56b6-a688-41f2a37b6463",
          "brand": "BMW",
          "model": "X5",
          "type": "Jeep",
          "price": "67000",
          "discount": 18,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "observedCars": [
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "991759a9-d62a-5dd1-bf1a-0d1f16756cc5",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "036d0b95-1372-5af6-b071-b9b358d249c7",
          "brand": "AUDI",
          "model": "Q7",
          "type": "Jeep",
          "price": "70000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "9032ff3c-6e81-52b8-95bb-a9051f951cc1",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 11,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "c39971ed-55aa-567d-86dc-106cce4bd96a",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 8,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "rating": [
        1,
        5,
        2,
        4,
        1,
        5,
        3,
        1,
        2,
        5,
        2,
        5,
        3,
        1,
        3,
        3,
        3,
        4,
        4
      ]
    },
    {
      "id": "902917ba-371e-5136-baf9-eac4fcd2d178",
      "firstName": "Amparo",
      "lastName": "Ledner",
      "username": "AmparLed",
      "password": "AmparLed",
      "email": "AmparLed@.email.com",
      "cars": [
        {
          "id": "7f9419bc-ec3c-5a3b-9945-95c22508c728",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 7,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8261a518-4053-52d5-9f60-5651cf77060f",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 0,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "bec37440-ec11-503d-9864-f448cb1724f0",
          "brand": "BMW",
          "model": "X5",
          "type": "Jeep",
          "price": "67000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "recentCars": [
        {
          "id": "e3e9f8bf-9c71-5cea-a823-a65bc6176e26",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 15,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "22f5323e-bc52-5ce5-9544-b63ef1072239",
          "brand": "MASERATI",
          "model": "Levante",
          "type": "SUV",
          "price": "75900",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "991759a9-d62a-5dd1-bf1a-0d1f16756cc5",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "observedCars": [
        {
          "id": "4b0fa64d-f8bc-531b-b3a6-4efe33591aef",
          "brand": "FIAT",
          "model": "500",
          "type": "CityCar",
          "price": "10900",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "349f396c-c3f2-5eb5-baa3-2c49404330c3",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 9,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "rating": [
        2,
        2,
        3,
        3,
        1,
        1,
        1,
        4,
        4,
        4
      ]
    },
    {
      "id": "8406f538-e5be-5cb8-8e4a-54ecd348d745",
      "firstName": "Koby",
      "lastName": "Nikolaus",
      "username": "KobyNik",
      "password": "KobyNik",
      "email": "KobyNik@.email.com",
      "cars": [
        {
          "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "036d0b95-1372-5af6-b071-b9b358d249c7",
          "brand": "AUDI",
          "model": "Q7",
          "type": "Jeep",
          "price": "70000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "e3e9f8bf-9c71-5cea-a823-a65bc6176e26",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 15,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "765153f1-0c59-5ac0-9b9c-3c5878faca7f",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "recentCars": [
        {
          "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "e3e9f8bf-9c71-5cea-a823-a65bc6176e26",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 15,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "962712d1-14c5-56ff-aa7f-c5e91ab4ee3a",
          "brand": "BMW",
          "model": "X5",
          "type": "Jeep",
          "price": "67000",
          "discount": 11,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "dd909fd4-e02f-5cd1-bbc2-c1bc8e2b59e6",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "765153f1-0c59-5ac0-9b9c-3c5878faca7f",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "observedCars": [
        {
          "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "rating": [
        5,
        4,
        5,
        3,
        1,
        3,
        1,
        3,
        4,
        1,
        3,
        1,
        4,
        1
      ]
    },
    {
      "id": "64178225-be4d-5540-b6d3-92fe37958e6f",
      "firstName": "Kiara",
      "lastName": "Murray",
      "username": "KiaraMur",
      "password": "KiaraMur",
      "email": "KiaraMur@.email.com",
      "cars": [
        {
          "id": "22f5323e-bc52-5ce5-9544-b63ef1072239",
          "brand": "MASERATI",
          "model": "Levante",
          "type": "SUV",
          "price": "75900",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "f246798c-9a05-5f8f-b73e-08a8a38c819a",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "8e46993a-5bad-5135-8ad8-8bdee3459859",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "recentCars": [
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "962712d1-14c5-56ff-aa7f-c5e91ab4ee3a",
          "brand": "BMW",
          "model": "X5",
          "type": "Jeep",
          "price": "67000",
          "discount": 11,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "1759575a-036e-5f7f-b7a3-1bab6cebba6c",
          "brand": "FERRARI",
          "model": "Portofino",
          "type": "Sportiva",
          "price": "195000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "a026b849-263b-5c55-be5c-20dfc460ca35",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "bec37440-ec11-503d-9864-f448cb1724f0",
          "brand": "BMW",
          "model": "X5",
          "type": "Jeep",
          "price": "67000",
          "discount": 14,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "observedCars": [
        {
          "id": "99ea703b-7e0b-5dd2-89df-0a9958f0f978",
          "brand": "FIAT",
          "model": "500 X Lounge",
          "type": "Berlina",
          "price": "21600",
          "discount": 4,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3b3bb8b0-2983-54a7-9afe-d7aae4578f53",
          "brand": "FERRARI",
          "model": "F40",
          "type": "Sportiva",
          "price": "900000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "765153f1-0c59-5ac0-9b9c-3c5878faca7f",
          "brand": "MASERATI",
          "model": "MC 20",
          "type": "Sportiva",
          "price": "200000",
          "discount": 13,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "ce713cbd-f61d-5f17-9c97-c16680ff6f08",
          "brand": "AUDI",
          "model": "A1",
          "type": "Berlina",
          "price": "22000",
          "discount": 3,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "f246798c-9a05-5f8f-b73e-08a8a38c819a",
          "brand": "MASERATI",
          "model": "Ghibli",
          "type": "Sportiva",
          "price": "71000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        },
        {
          "id": "3f1ee322-04c4-5f96-8c33-512da7e52a2f",
          "brand": "BMW",
          "model": "Serie 1",
          "type": "Berlina",
          "price": "27000",
          "discount": 10,
          "image1": "",
          "image2": "",
          "image3": ""
        }
      ],
      "rating": [
        5,
        3,
        2,
        4,
        2,
        2,
        2,
        2,
        3,
        4
      ]
    }
  ]

// AGGIORNA GLI ID DI TUTTE LE CARS IN 0, 1, 2, 3 ETC...

for(  j=0; j<cars.length;j++){
    users.map( user => {
        user.cars.map( car => {
            car.id == cars[j].id ? car.id = j : null
        })

        user.observedCars.map( car => {
          car.id == cars[j].id ? car.id = j : null
        })

      user.recentCars.map( car => {
        car.id == cars[j].id ? car.id = j : null
      })
    })
    cars[j].id = j
}

// AGGIORNA GLI ID DEGLI UTENTI IN 0, 1, 2, 3 ETC...

for(let j=0; j<users.length; j++){
  users[j].id = j
}

// ELIMINA I DUPLICATI NELLE CARS VENDUTE DEGLI USERS
let unique =[];
users.map( user =>{

  userCars = user.cars

  for(let j=0;j<userCars.length;j++){
  // se la car iterata è inclusa, sostituiscila con una non duplicata
    if(unique.includes(userCars[j].id)){

      index = userCars.findIndex(car => car.id == userCars[j].id)

      for(let k=0; k<cars.length;k++){
        
        // sostituisce la car duplicata con una non duplicata se l' id non è incluso in unique
        if(!unique.includes(cars[k].id)){
          
          userCars.splice(index, 1, cars[k])
          unique.push(cars[k].id)
          
          break
       
        }
      
      }
    
    }else{
    
      unique.push(userCars[j].id)
  
    }
  
  }


})

// Aggiunge userId e username alle cars
users.map( user => {

    userCars = user.cars

    userCars.map( userCar => {

        cars.map( car => {

            if(car.id == userCar.id){

                car.userId = user.id
                car.username = user.username

            }

        })

    })

})



//Aggiunge l' userId e l' username alle cars degli users
users.map( user => {

    userCars = user.cars

    userCars.map( userCar => {

        userCar.userId = user.id
        userCar.username = user.username

    })

    observedCars = user.observedCars

    observedCars.map( observedCar => {

        cars.map( car => {

            if(car.id == observedCar.id){
                observedCar.userId = car.userId
                observedCar.username = car.username
            }

        })

    })

    recentCars = user.recentCars

    recentCars.map( recentCar => {

        cars.map( car => {

            if(car.id == recentCar.id){
                recentCar.userId = car.userId
                recentCar.username = car.username
            }

        })

    })

})

// ELimina le cars in cars che non sono vendute da nessuno
include = []

users.map( user => {
    
    userCars = user.cars

    userCars.map( userCar => {

        include.push(userCar.id)

    })
})

console.log(include)

for(let k=0;k<cars.length;k++){

    if(!include.includes(cars[k].id)){
        index = cars.findIndex( carInd => carInd.id == cars[k].id)
        cars.splice(index, 1)
        k -= 1
    }
}
//Elimina le cars inesistenti dagli array observed e recent
include = []
cars.map( car => {
    include.push(car.id)
})

users.map(user => {

    observed = user.observedCars

    for(let k=0;k<observed.length;k++){
        if(!include.includes(observed[k].id)){
            index = observed.findIndex( obs => obs.id == observed[k].id)
            observed.splice(index, 1)
            k -= 1
        }
    }

    recent = user.recentCars

    for(let k=0;k<recent.length;k++){
        if(!include.includes(recent[k].id)){
            index = recent.findIndex( obs => obs.id == recent[k].id)
            recent.splice(index, 1)
            k -= 1
        }
    }

})
//AGGIUNGE L' URL DELLE IMMAGINI DELLE CARS
cars.map( car => {

    switch(car.model){

        case 'Ghibli':
            car.image1 = 'maserati_ghibli_img1.jpg'
            car.image2 = 'maserati_ghibli_img2.jpg'
            car.image3 = 'maserati_ghibli_img3.jpg'

            break

        case 'Serie 1':
            car.image1 = 'bmw_serie1_img1.jpg'
            car.image2 = 'bmw_serie1_img2.jpg'
            car.image3 = 'bmw_serie1_img3.jpg'
            break

        case 'F40':
            car.image1 = 'ferrari_f40_img1.jpg'
            car.image2 = 'ferrari_f40_img2.jpg'
            car.image3 = 'ferrari_f40_img3.jpg'
            break

        case 'Q7':
            car.image1 = 'audi_Q7_img1.jpg'
            car.image2 = 'audi_Q7_img2.jpg'
            car.image3 = 'audi_Q7_img3.jpg'
            break

        case '500 X Lounge':
            car.image1 = 'fiat_500_img1.jpg'
            car.image2 = 'fiat_500_img2.jpg'
            car.image3 = 'fiat_500_img3.jpg'
            break
            
        case 'X5':
            car.image1 = 'bmw_x5_img1.jpg'
            car.image2 = 'bmw_x5_img2.jpg'
            car.image3 = 'bmw_x5_img3.jpg'
            break

        case 'A1':
          car.image1 = 'audi_A1_img1.jpg'
          car.image2 = 'audi_A1_img2.jpg'
          car.image3 = 'audi_A1_img3.jpg'
          break

        case '500':
          car.image1 = 'fiat_500_img1.jpg'
          car.image2 = 'fiat_500_img2.jpg'
          car.image3 = 'fiat_500_img3.jpg'
          break

        case 'MC 20':
          car.image1 = 'maserati_mc20_img1.jpg'
          car.image2 = 'maserati_mc20_img2.jpg'
          car.image3 = 'maserati_mc20_img3.jpg'
          break

        case 'Levante':
          car.image1 = 'maserati_levante_img1.jpg'
          car.image2 = 'maserati_levante_img2.jpg'
          car.image3 = 'maserati_levante_img3.jpg'
          break

        case 'Portofino':
          car.image1 = 'ferrari_portofino_img1.jpg'
          car.image2 = 'ferrari_portofino_img2.jpg'
          car.image3 = 'ferrari_portofino_img3.jpg'
        
          break

    }

})

//AGGIUNGE L' URL DELLE IMMAGINI DELLE CARS DEGLI USERS
users.map( user => {
    
    userCars = user.cars

    userCars.map( car => {

        switch(car.model){

            case 'Ghibli':
                car.image1 = 'maserati_ghibli_img1.jpg'
                car.image2 = 'maserati_ghibli_img2.jpg'
                car.image3 = 'maserati_ghibli_img3.jpg'
      
                break
      
            case 'Serie 1':
                car.image1 = 'bmw_serie1_img1.jpg'
                car.image2 = 'bmw_serie1_img2.jpg'
                car.image3 = 'bmw_serie1_img3.jpg'
                break
      
            case 'F40':
                car.image1 = 'ferrari_f40_img1.jpg'
                car.image2 = 'ferrari_f40_img2.jpg'
                car.image3 = 'ferrari_f40_img3.jpg'
                break
      
            case 'Q7':
                car.image1 = 'audi_Q7_img1.jpg'
                car.image2 = 'audi_Q7_img2.jpg'
                car.image3 = 'audi_Q7_img3.jpg'
                break
      
            case '500 X Lounge':
                car.image1 = 'fiat_500XLounge_img1.jpg'
                car.image2 = 'fiat_500XLounge_img2.jpg'
                car.image3 = 'fiat_500XLounge_img3.jpg'
                break
                
            case 'X5':
                car.image1 = 'bmw_x5_img1.jpg'
                car.image2 = 'bmw_x5_img2.jpg'
                car.image3 = 'bmw_x5_img3.jpg'
                break
      
            case 'A1':
              car.image1 = 'audi_A1_img1.jpg'
              car.image2 = 'audi_A1_img2.jpg'
              car.image3 = 'audi_A1_img3.jpg'
              break
      
            case '500':
              car.image1 = 'fiat_500_img1.jpg'
              car.image2 = 'fiat_500_img2.jpg'
              car.image3 = 'fiat_500_img3.jpg'
              break
      
            case 'MC 20':
              car.image1 = 'maserati_mc20_img1.jpg'
              car.image2 = 'maserati_mc20_img2.jpg'
              car.image3 = 'maserati_mc20_img3.jpg'
              break
      
            case 'Levante':
              car.image1 = 'maserati_levante_img1.jpg'
              car.image2 = 'maserati_levante_img2.jpg'
              car.image3 = 'maserati_levante_img3.jpg'
              break
      
            case 'Portofino':
              car.image1 = 'ferrari_portofino_img1.jpg'
              car.image2 = 'ferrari_portofino_img2.jpg'
              car.image3 = 'ferrari_portofino_img3.jpg'
            
              break

        }

    })

    userCars = user.observedCars

    userCars.map( car => {

        switch(car.model){

            case 'Ghibli':
                car.image1 = 'maserati_ghibli_img1.jpg'
                car.image2 = 'maserati_ghibli_img2.jpg'
                car.image3 = 'maserati_ghibli_img3.jpg'
      
                break
      
            case 'Serie 1':
                car.image1 = 'bmw_serie1_img1.jpg'
                car.image2 = 'bmw_serie1_img2.jpg'
                car.image3 = 'bmw_serie1_img3.jpg'
                break
      
            case 'F40':
                car.image1 = 'ferrari_f40_img1.jpg'
                car.image2 = 'ferrari_f40_img2.jpg'
                car.image3 = 'ferrari_f40_img3.jpg'
                break
      
            case 'Q7':
                car.image1 = 'audi_Q7_img1.jpg'
                car.image2 = 'audi_Q7_img2.jpg'
                car.image3 = 'audi_Q7_img3.jpg'
                break
      
            case '500 X Lounge':
                car.image1 = 'fiat_500XLounge_img1.jpg'
                car.image2 = 'fiat_500XLounge_img2.jpg'
                car.image3 = 'fiat_500XLounge_img3.jpg'
                break
                
            case 'X5':
                car.image1 = 'bmw_x5_img1.jpg'
                car.image2 = 'bmw_x5_img2.jpg'
                car.image3 = 'bmw_x5_img3.jpg'
                break
      
            case 'A1':
              car.image1 = 'audi_A1_img1.jpg'
              car.image2 = 'audi_A1_img2.jpg'
              car.image3 = 'audi_A1_img3.jpg'
              break
      
            case '500':
              car.image1 = 'fiat_500_img1.jpg'
              car.image2 = 'fiat_500_img2.jpg'
              car.image3 = 'fiat_500_img3.jpg'
              break
      
            case 'MC 20':
              car.image1 = 'maserati_mc20_img1.jpg'
              car.image2 = 'maserati_mc20_img2.jpg'
              car.image3 = 'maserati_mc20_img3.jpg'
              break
      
            case 'Levante':
              car.image1 = 'maserati_levante_img1.jpg'
              car.image2 = 'maserati_levante_img2.jpg'
              car.image3 = 'maserati_levante_img3.jpg'
              break
      
            case 'Portofino':
              car.image1 = 'ferrari_portofino_img1.jpg'
              car.image2 = 'ferrari_portofino_img2.jpg'
              car.image3 = 'ferrari_portofino_img3.jpg'
            
              break

        }

    })

    userCars = user.recentCars

    userCars.map( car => {

        switch(car.model){

            case 'Ghibli':
                car.image1 = 'maserati_ghibli_img1.jpg'
                car.image2 = 'maserati_ghibli_img2.jpg'
                car.image3 = 'maserati_ghibli_img3.jpg'
      
                break
      
            case 'Serie 1':
                car.image1 = 'bmw_serie1_img1.jpg'
                car.image2 = 'bmw_serie1_img2.jpg'
                car.image3 = 'bmw_serie1_img3.jpg'
                break
      
            case 'F40':
                car.image1 = 'ferrari_f40_img1.jpg'
                car.image2 = 'ferrari_f40_img2.jpg'
                car.image3 = 'ferrari_f40_img3.jpg'
                break
      
            case 'Q7':
                car.image1 = 'audi_Q7_img1.jpg'
                car.image2 = 'audi_Q7_img2.jpg'
                car.image3 = 'audi_Q7_img3.jpg'
                break
      
            case '500 X Lounge':
                car.image1 = 'fiat_500XLounge_img1.jpg'
                car.image2 = 'fiat_500XLounge_img2.jpg'
                car.image3 = 'fiat_500XLounge_img3.jpg'
                break
                
            case 'X5':
                car.image1 = 'bmw_x5_img1.jpg'
                car.image2 = 'bmw_x5_img2.jpg'
                car.image3 = 'bmw_x5_img3.jpg'
                break
      
            case 'A1':
              car.image1 = 'audi_A1_img1.jpg'
              car.image2 = 'audi_A1_img2.jpg'
              car.image3 = 'audi_A1_img3.jpg'
              break
      
            case '500':
              car.image1 = 'fiat_500_img1.jpg'
              car.image2 = 'fiat_500_img2.jpg'
              car.image3 = 'fiat_500_img3.jpg'
              break
      
            case 'MC 20':
              car.image1 = 'maserati_mc20_img1.jpg'
              car.image2 = 'maserati_mc20_img2.jpg'
              car.image3 = 'maserati_mc20_img3.jpg'
              break
      
            case 'Levante':
              car.image1 = 'maserati_levante_img1.jpg'
              car.image2 = 'maserati_levante_img2.jpg'
              car.image3 = 'maserati_levante_img3.jpg'
              break
      
            case 'Portofino':
              car.image1 = 'ferrari_portofino_img1.jpg'
              car.image2 = 'ferrari_portofino_img2.jpg'
              car.image3 = 'ferrari_portofino_img3.jpg'
            
              break

        }

    })

})

// elimina i duplicati nell array observed degli users
users.map( user => {
    let unique = []
    let index = ''
    user.observedCars.map( observed => {
        if(unique.includes(observed.id)){
            index = user.observedCars.findIndex( car => car.id == observed.id)
            user.observedCars.splice(index, 1)
        }else{
            unique.push(observed.id)
        }
    })
})

//crea l'oggetto observed, un array di tutti gli oggetti osservati dagli users
var observed = []
users.map( user => {

    userObserved = user.observedCars

    userObserved.map( observedCar => {
        obs = observedCar
        obs.observedByUsername = user.username
        obs.observedByUserId = user.id
        observed.push(obs)
    })

})

observedObj = observed   
carsObj = cars
usersObj = users

fs.writeFile("./cars.json", JSON.stringify(carsObj), function (err) {
    if (err) throw err;
});

fs.writeFile("./users.json", JSON.stringify(usersObj), function (err) {
    if (err) throw err;
});

fs.writeFile("./observed.json", JSON.stringify(observedObj), function (err) {
    if (err) throw err;
});

