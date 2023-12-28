
# Shoes Hub

In this website we basically added the shoes through  Admin Panel.
The user can visit website without login and see the products and also have an access to Add to Cart the product. But to see cart products he/she should  have to login first and if he/she didnot login then cart page will not be shown to them. After login they can go to cart page and where they can see the products and can delete and increase the quantity of product accrording to their needs.

For payment we added a Stripe Payment Gateway when clicks it on checkout button the it redirects on the stripe checkout page where he/she can added his information and buy the products. If everything is going perfectly is redirects on the checkout succesful page, Otherwise it redirects on checkout unsuccesful page


## Features

- Private Routing
- Live previews
- Responsive for every screen size
- Cross platform


## Tech Stack

**Client:** React, Context API And UseReducer, TailwindCSS , Ant-Design UI

**Server:** Node, Express

**Database** Mongodb


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` |  http://localhost:8000/products/getproducts |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` |  http://localhost:8000/products/getsingleproduct/65803148f9ae2d3ea3144f30 |




## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/Qasim333/CodeWithMERN.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Demo

Here is the deployed link of Website on Vercel 

  [Shoes Hub](https://khazany-clone.vercel.app/)

## Authors

- [@Qasim333](https://github.com/Qasim333/) 
- [@shk_Talha33](https://github.com/shkTalha33/)

