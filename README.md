````markdown name=README.md
# TS-NODE-EXPRESS-TODOLIST

Simple TypeScript/Node.js/Express todolist API.

## Overview

This is a RESTful API for managing todos, categories, and colors built with TypeScript, Node.js, and Express. The API provides full CRUD operations for todos, categories, and colors, with filtering, sorting, and color association capabilities. Data is persisted using the filesystem (`fs`) rather than a traditional database.

## Features

- ✅ Todo management (Create, Read, Update, Delete)
- 📁 Category management (Create, Read, Update, Delete)
- 🎨 Color management (Create, Read, Update, Delete)
- 🔍 Filtering and sorting for todos, categories, and colors
- 🏷️ Associate todos with categories
- 🌈 Assign and manage colors for categories
- 🌐 RESTful API design
- 📂 Data storage using Node.js `fs` module

## API Endpoints

### Base URL

```
http://localhost:5049/api
```

### Todos

| Method | Endpoint            | Description     | Query Parameters (for GET)                     |
| ------ | ------------------- | --------------- | ---------------------------------------------- |
| GET    | `/todos`            | Get all todos   | `fromDate`, `toDate`, `sort`, `order`         |
| GET    | `/todos/:id`        | Get single todo | `id` (path parameter)                         |
| POST   | `/todos/create`     | Create new todo | Request body required                         |
| PATCH  | `/todos/update`     | Update todo     | Request body required                         |
| DELETE | `/todos/delete/:id` | Delete todo     | `id` (path parameter)                         |

#### Todo Request Body Examples

**Create Todo:**
```json
{
  "text": "Sample Todo",
  "categoryId": "your-category-id"
}
```

**Update Todo:**
```json
{
  "id": "your-todo-id",
  "text": "Updated Todo",
  "status": "pending",
  "categoryId": "your-category-id"
}
```

---

### Categories

| Method | Endpoint                 | Description         | Query Parameters (for GET)    |
| ------ | ------------------------ | ------------------- | ----------------------------- |
| GET    | `/categories`            | Get all categories  | `sort`, `order`               |
| GET    | `/categories/:id`        | Get single category | `id` (path parameter)         |
| POST   | `/categories/create`     | Create new category | Request body required         |
| PATCH  | `/categories/update`     | Update category     | Request body required         |
| DELETE | `/categories/delete/:id` | Delete category     | `id` (path parameter)         |

#### Category Request Body Examples

**Create Category:**
```json
{
  "text": "Sample Category"
}
```

**Update Category:**
```json
{
  "id": "your-category-id",
  "text": "Updated Category",
  "color": "color-id" // optional, must be a valid color ID
}
```

---

### Colors

| Method | Endpoint            | Description        | Query Parameters (for GET)    |
| ------ | ------------------- | ------------------ | ----------------------------- |
| GET    | `/colors`           | Get all colors     | `sort`, `order`               |
| GET    | `/colors/:id`       | Get single color   | `id` (path parameter)         |


## Query Parameters (Filtering & Sorting)

All `GET` endpoints that return lists support filtering and sorting:

- `fromDate`: Filter todos from this date (YYYY-MM-DD)
- `toDate`: Filter todos until this date (YYYY-MM-DD)
- `sort`: Field to sort by (e.g. `createdAt`, `name`, etc.)
- `order`: Sort order (`asc` or `desc`)

**Example:**
```
GET /todos?fromDate=2024-01-01&toDate=2024-12-31&sort=createdAt&order=desc
GET /categories?sort=text&order=asc
GET /colors?sort=name&order=desc
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript

### Installation

1. Clone the repository

    ```bash
    git clone <repository-url>
    cd todo-category-api
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the development server

    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:5049/api`

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5049
BASE_OF_ROUTE=/api
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5049
```

> **Note:** Data is persisted using Node.js `fs` module. There is no traditional database configuration required.

---

## Data Storage

All data (todos, categories, colors) is stored as files using Node.js `fs` module. Each entity is saved as a separate `.txt` or `.json` file under its respective folder.

---

## Testing with Postman

### Environment Variables Setup

Set up these environment variables in Postman:

- `baseURL`: `http://localhost:5049/api`
- `id`: Replace with actual ID when testing
- `categoryId`: Replace with actual category ID when testing
- `colorId`: Replace with actual color ID when testing
- `fromDate`: Date in YYYY-MM-DD format
- `toDate`: Date in YYYY-MM-DD format
- `sort`: Field name to sort by
- `order`: `asc` or `desc`

### Import Collection

1. Open Postman
2. Click "Import"
3. Paste the provided collection JSON
4. Set up the environment variables
5. Start testing the endpoints

---

## API Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    "result": {...}
  }
}
```

### Error Response

```json
{
{
  "status": "error",
  "message": "Invalid request parameters"
}
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

If you have any questions or need help, please open an issue in the repository.

````