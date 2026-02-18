# Insta Backend API

This repository contains the backend for a basic Instagram-like application. It is built with Node.js, Express, and MongoDB. Users can register, log in, create posts with images (via ImageKit), view their posts, and follow other users.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
   ```
4. Start the server with `node server.js`.

## Middleware

- `express.json()` for parsing JSON bodies
- `cookie-parser` for handling authentication tokens

## Routes / Endpoints

### Authentication

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Log in an existing user |

#### Register
**Request**
```json
POST /api/auth/register
Content-Type: application/json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123",
  "bio": "Hello world",
  "profilePic": "https://example.com/avatar.jpg"
}
```
**Response (201 Created)**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "john@example.com",
    "username": "johndoe",
    "bio": "Hello world",
    "profilePic": "https://example.com/avatar.jpg"
  }
}
```

#### Login
**Request**
```json
POST /api/auth/login
Content-Type: application/json
{
  "username": "johndoe",
  "password": "secret123"
}
```
(Note: you can also supply `email` instead of username)

**Response (200 OK)**
```json
{
  "message": "User logged in successfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Hello world",
    "profilePic": "https://example.com/avatar.jpg"
  }
}
```

### Posts

All post routes require authentication (via cookie `token`).

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/api/posts/`                 | Create a new post (with image) |
| GET    | `/api/posts/`                 | Get all posts of authenticated user |
| GET    | `/api/posts/details/:postId`  | Get details for a single post   |

#### Create Post
**Request (multipart/form-data)**
```
POST /api/posts/
Content-Type: multipart/form-data
Cookie: token=<jwt>

Fields:
- image: (file)
- caption: "My first post"
```
**Response (201 Created)**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "605c5f...",
    "caption": "My first post",
    "imgUrl": "https://ik.imagekit.io/...",
    "user": "603b9f...",
    "createdAt": "2021-03-25T...",
    "updatedAt": "2021-03-25T...",
    "__v": 0
  }
}
```

#### Get Posts
**Request**
```
GET /api/posts/
Cookie: token=<jwt>
```
**Response (200 OK)**
```json
{
  "message": "Posts retrieved successfully",
  "posts": [
    {
      "_id": "605c5f...",
      "caption": "My first post",
      "imgUrl": "https://ik.imagekit.io/...",
      "user": "603b9f...",
      "createdAt": "2021-03-25T...",
      "updatedAt": "2021-03-25T...",
      "__v": 0
    }
  ]
}
```

#### Get Post Details
**Request**
```
GET /api/posts/details/605c5f...
Cookie: token=<jwt>
```
**Response (200 OK)**
```json
{
  "message": "Post details retrieved successfully",
  "post": {
    "_id": "605c5f...",
    "caption": "My first post",
    "imgUrl": "https://ik.imagekit.io/...",
    "user": "603b9f...",
    "createdAt": "2021-03-25T...",
    "updatedAt": "2021-03-25T...",
    "__v": 0
  }
}
```

### Users

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/users/follow/:username` | Follow another user            |

#### Follow User
**Request**
```
POST /api/users/follow/janedoe
Cookie: token=<jwt>
```
**Response (201 Created)**
```json
{
  "message": "You are now following janedoe",
  "follow": {
    "_id": "605c6e...",
    "follower": "johndoe",
    "followee": "janedoe",
    "createdAt": "2021-03-25T...",
    "updatedAt": "2021-03-25T...",
    "__v": 0
  }
}
```

If already following, returns 200 with existing record.

## Database Models

- **Users**: username, email, password, bio, profilePic
- **Posts**: caption, imgUrl, user (ref)
- **Follow**: follower, followee

## Authentication

JWT stored in an HTTP-only cookie named `token`. Required for most routes.

---
