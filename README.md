# 🛒 E-Commerce Server

A RESTful API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** for managing products and customer orders. The project follows a modular architecture and includes validation, error handling, and deployment support.

---

## 🚀 Features

- Product CRUD operations
- Order management
- Input validation using Zod
- MongoDB integration with Mongoose
- TypeScript support
- Centralized error handling
- CORS enabled
- Environment variable configuration
- Ready for deployment on Vercel

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| TypeScript | Programming Language |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB ODM |
| Zod | Request Validation |
| dotenv | Environment Variables |
| CORS | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```text
ecommerce-server/
│
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── product/
│   │   │   └── orders/
│   │   └── app.ts
│   │
│   └── server.ts
│
├── dist/
├── sample-data.json
├── .env.example
├── package.json
├── tsconfig.json
└── vercel.json
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/bishalacharya108/ecommerce-server.git

cd ecommerce-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL=mongodb://localhost:27017/ecommerce-db
```

You can also use a MongoDB Atlas connection string.

---

## ▶️ Running the Project

### Development

```bash
npm run start:dev
```

### Production

Build the project

```bash
npm run build
```

Run the compiled server

```bash
npm run start
```

---

## 📜 Available Scripts

| Script | Description |
|---------|-------------|
| `npm run start` | Run production server |
| `npm run start:dev` | Run development server |
| `npm run build` | Compile TypeScript |
| `npm run lint` | Run ESLint |
| `npm run prettier` | Format project files |

---

## 🌐 API Endpoints

### Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:productId` | Get a product by ID |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:productId` | Update a product |
| DELETE | `/api/products/:productId` | Delete a product |

---

### Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create an order |

---

## 🌍 Base URL

```
http://localhost:5000
```

or your deployed server URL.

---

## 📦 Sample Data

A sample product dataset is included.

```
sample-data.json
```

You can use it to populate your MongoDB database.

---

## 🚀 Deployment

The project includes a `vercel.json` configuration and can be deployed directly to **Vercel**.

---

## 🔗 Live Demo

https://ecommerce-server-orpin-eight.vercel.app/

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

Made with ❤️ using **TypeScript**, **Express.js**, and **MongoDB**.
