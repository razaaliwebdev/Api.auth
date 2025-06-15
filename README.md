# Authentication API Documentation

This is a RESTful Authentication API built with Node.js, Express, and MongoDB. The API provides user authentication functionality including registration, login, and profile management.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Security](#security)

## Features

- User registration with avatar upload
- User login with JWT authentication
- Protected profile route
- File upload handling
- MongoDB database integration
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd server
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
npm start
```

## API Endpoints

### 1. Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Description**: Register a new user with avatar upload
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "avatar": "file"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "data": {
        "user": {
          "name": "string",
          "email": "string",
          "avatar": "string"
        },
        "token": "string"
      }
    }
    ```

### 2. Login User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "user": {
          "name": "string",
          "email": "string",
          "avatar": "string"
        },
        "token": "string"
      }
    }
    ```

### 3. Get User Profile

- **URL**: `/api/users/me`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Description**: Get authenticated user's profile
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "user": {
          "name": "string",
          "email": "string",
          "avatar": "string"
        }
      }
    }
    ```

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

Common error codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Protected routes require valid JWT token
- File uploads are restricted to image files
- Environment variables for sensitive data

## File Upload

The API supports file uploads for user avatars:

- Supported formats: Images (jpg, jpeg, png)
- Files are stored in the `/uploads` directory
- Maximum file size: 5MB

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
