# TS-NODE-EXPRESS-TODOLIST

Simple typescript/node/express todolist.

## Overview

This is a RESTful API for managing todos and categories built with TypeScript, Node.js, and Express. The API provides full CRUD operations for both todos and categories with filtering and sorting capabilities.

## Features

- ✅ Todo management (Create, Read, Update, Delete)
- 📁 Category management (Create, Read, Update, Delete)
- 🔍 Filter todos by date range
- 📊 Sort todos with custom ordering
- 🏷️ Associate todos with categories
- 🌐 RESTful API design

## API Endpoints

### Base URL

```
http://localhost:5049/api
```

### Todos

| Method | Endpoint            | Description     | Parameters                            |
| ------ | ------------------- | --------------- | ------------------------------------- |
| GET    | `/todos`            | Get all todos   | `fromDate`, `toDate`, `sort`, `order` |
| GET    | `/todos/:id`        | Get single todo | `id` (path parameter)                 |
| POST   | `/todos/create`     | Create new todo | Request body required                 |
| PATCH  | `/todos/update`     | Update todo     | Request body required                 |
| DELETE | `/todos/delete/:id` | Delete todo     | `id` (path parameter)                 |

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

### Categories

| Method | Endpoint                 | Description         | Parameters            |
| ------ | ------------------------ | ------------------- | --------------------- |
| GET    | `/categories`            | Get all categories  | None                  |
| GET    | `/categories/:id`        | Get single category | `id` (path parameter) |
| POST   | `/categories/create`     | Create new category | Request body required |
| PATCH  | `/categories/update`     | Update category     | Request body required |
| DELETE | `/categories/delete/:id` | Delete category     | `id` (path parameter) |

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
  "text": "Updated Category"
}
```

## Query Parameters

### Todo Filtering and Sorting

- `fromDate`: Filter todos from this date
- `toDate`: Filter todos until this date
- `sort`: Field to sort by
- `order`: Sort order (asc/desc)

**Example:**

```
GET /todos?fromDate=2024-01-01&toDate=2024-12-31&sort=createdAt&order=desc
```

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

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5049
DATABASE_URL=your-database-url
NODE_ENV=development
```

## Testing with Postman

### Environment Variables Setup

Set up these environment variables in Postman:

- `baseURL`: `http://localhost:5049/api`
- `id`: Replace with actual ID when testing
- `categoryId`: Replace with actual category ID when testing
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

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue in the repository.
