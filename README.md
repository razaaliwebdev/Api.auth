# Authentication API Documentation

This is a RESTful Authentication API built with Node.js, Express, and MongoDB. The API provides user authentication functionality including registration, login, and profile management.

## Live API URL

The API is currently live and accessible at: [https://api-auth-2ywi.onrender.com](https://api-auth-2ywi.onrender.com)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Frontend Integration](#frontend-integration)
- [Error Handling](#error-handling)
- [Security](#security)
- [Use Cases](#use-cases)

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

## Frontend Integration

### Setting up API Base URL

In your frontend application, set up the API base URL:

```javascript
const API_BASE_URL = "https://api-auth-2ywi.onrender.com";
```

### Example Frontend Integration

#### 1. User Registration

```javascript
// Using fetch
const registerUser = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("avatar", userData.avatar);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Using axios
const registerUser = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("avatar", userData.avatar);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
```

#### 2. User Login

```javascript
// Using fetch
const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Using axios
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
```

#### 3. Get User Profile

```javascript
// Using fetch
const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

// Using axios
const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};
```

### Token Management

After successful login or registration, store the JWT token:

```javascript
// Store token
const storeToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Get token
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Remove token (logout)
const removeToken = () => {
  localStorage.removeItem("authToken");
};
```

## Use Cases

This API can be used to build various applications:

1. **Social Media Applications**

   - User authentication
   - Profile management
   - Avatar uploads

2. **E-commerce Platforms**

   - User registration and login
   - Secure user profiles
   - Customer management

3. **Content Management Systems**

   - Admin authentication
   - User role management
   - Profile customization

4. **Educational Platforms**

   - Student/Teacher authentication
   - Profile management
   - Avatar customization

5. **Healthcare Applications**
   - Patient authentication
   - Secure profile management
   - Medical record access control

## API Response Format

All API responses follow a consistent format:

```javascript
// Success Response
{
  "success": true,
  "message": "Operation successful message",
  "data": {
    // Response data
  }
}

// Error Response
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
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

## Live API Integration Guide

### Base URL

```
https://api-auth-2ywi.onrender.com
```

### Available Live Endpoints

1. **User Registration**

   ```
   POST https://api-auth-2ywi.onrender.com/api/users/register
   ```

   - Content-Type: `multipart/form-data`
   - Body:
     ```javascript
     {
       name: "John Doe",
       email: "john@example.com",
       password: "yourpassword",
       avatar: File // Optional
     }
     ```

2. **User Login**

   ```
   POST https://api-auth-2ywi.onrender.com/api/users/login
   ```

   - Content-Type: `application/json`
   - Body:
     ```javascript
     {
       email: "john@example.com",
       password: "yourpassword"
     }
     ```

3. **Get User Profile**
   ```
   GET https://api-auth-2ywi.onrender.com/api/users/me
   ```
   - Headers: `Authorization: Bearer <your_token>`

### React.js Integration Example

1. **First, create an API service file** (`src/services/api.js`):

```javascript
import axios from "axios";

const API_URL = "https://api-auth-2ywi.onrender.com";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Register new user
  register: async (userData) => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    const response = await api.post("/api/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/api/users/login", credentials);
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get("/api/users/me");
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("authToken");
  },
};

export default api;
```

2. **Create a React component for registration** (`src/components/Register.js`):

```javascript
import React, { useState } from "react";
import { authService } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
      // Store token
      localStorage.setItem("authToken", response.data.token);
      // Handle successful registration
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="file"
        onChange={(e) =>
          setFormData({ ...formData, avatar: e.target.files[0] })
        }
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
```

3. **Create a React component for login** (`src/components/Login.js`):

```javascript
import React, { useState } from "react";
import { authService } from "../services/api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      // Store token
      localStorage.setItem("authToken", response.data.token);
      // Handle successful login
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
```

4. **Create a React component for profile** (`src/components/Profile.js`):

```javascript
import React, { useState, useEffect } from "react";
import { authService } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setProfile(response.data.user);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <img src={profile.avatar} alt="Profile" />
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;
```

### Error Handling

The API returns errors in the following format:

```javascript
{
  success: false,
  message: "Error message",
  error: {
    code: "ERROR_CODE",
    details: "Additional error details"
  }
}
```

Common error codes:

- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid or missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

### Testing the API

You can test the API endpoints using tools like Postman or cURL:

```bash
# Register
curl -X POST https://api-auth-2ywi.onrender.com/api/users/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=password123" \
  -F "avatar=@/path/to/avatar.jpg"

# Login
curl -X POST https://api-auth-2ywi.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Profile
curl -X GET https://api-auth-2ywi.onrender.com/api/users/me \
  -H "Authorization: Bearer your_token_here"
```

Remember to:

1. Always handle errors appropriately in your frontend code
2. Store the JWT token securely (localStorage is used in examples, but you might want to use more secure methods in production)
3. Implement proper loading states and error messages in your UI
4. Use environment variables for the API URL in production
