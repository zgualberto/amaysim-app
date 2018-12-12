# Amaysim Add to Cart App

This is an Add to Cart app made specifically to Amaysim (AU telco). This is the backend platform developed in full native Node JS (no library used).

### Product Information

| Product Code  | Product Name  | Price  |
| ------------- |:-------------:| ------:|
| ult_small     | Unlimited 1GB | $24.90 |
| ult_medium    | Unlimited 2GB | $29.90 |
| ult_large     | Unlimited 5GB | $44.90 |
| 1gb           | 1 GB Data-pack| $9.90  |

### Special Offers

* A 3 for 2 deal on Unlimited 1GB Sims. So for example, if you buy 3 Unlimited 1GB Sims, you will pay the price of 2 only for the first month.
* The Unlimited 5GB Sim will have a bulk discount applied; whereby the price will drop to $39.90 each for the first month, if the customer buys more than 3.
* We will bundle in a free 1 GB Data-pack free-of-charge with every Unlimited 2GB sold.
* Adding the promo code 'I<3AMAYSIM' will apply a 10% discount across the board.

### Scenario

| Scenario  | Items Added                               | Expected Cart Total  | Expected Cart Items  |
| --------- |:-----------------------------------------:| --------------------:| -------------------: |
| 1         | 3 x Unlimited 1 GB<br/>1 x Unlimited 5 GB | $94.70               | 3 x Unlimited 1 GB<br/>1 x Unlimited 5 GB |
| 2         | 2 x Unlimited 1 GB<br/>4 x Unlimited 5 GB | $209.40              | 2 x Unlimited 1 GB<br/>4 x Unlimited 5 GB |
| 3         | 1 x Unlimited 1 GB<br/>2 X Unlimited 2 GB | $84.70               | 1 x Unlimited 1 GB<br/>2 X Unlimited 2 GB<br/>2 X 1 GB Data-pack |
| 4         | 1 x Unlimited 1 GB<br/>1 x 1 GB Data-pack<br/>'I<3AMAYSIM' Promo Applied | $31.32  | 1 x Unlimited 1 GB<br/>1 x 1 GB Data-pack |

## Getting Started

### Prerequisites

What things you need to install the software and how to install them

```
Node JS (10.12.0)
NPM
Postman (API development environment)
```

## Installing

### In CLI

```
npm install
```

To run the app

```
node index.js
```

## ENDPOINT
### POST /cart

This endpoint accepts RAW post data

## w/ promo
### Sample Query String
```
{
    "promo":"I<3AMAYSIM",
    "cart":[
        "ult_small",
        "ult_small",
        "ult_large",
        "ult_large",
        "ult_large",
        "ult_large"
    ]
}
```
### Model
```
{
    "promo":"string",
    "cart":[
        "string"
    ]
}
```

<hr>

## w/o promo

### Sample Query String
```
{
    "cart":[
        "ult_small",
        "ult_small",
        "ult_large",
        "ult_large",
        "ult_large",
        "ult_large"
    ]
}
```
### Model
```
{
    "cart":[
        "string"
    ]
}
```

## Authors

* **Ziegfrid N. Gualberto**
