# Funny Commerce Site
This is a small e-commerce project with and integrated recommendation system

# About us
We are a team consists of 4 students from Institute of Artificial Intelligence, UET-VNU
- Khổng Ngọc Anh 22022549
- Bùi Trọng Anh 22022572
- Đỗ Ngọc Anh 22022577
- Nguyền Bình Minh 22022579

# Server activation
- To install the necessary packages:
```
pip install -r requirements.txt
```
- To run the server:
``` 
python src\app.py
```

# API Usage
## General
- The `src\app.py` file is where the routes and activation code resides
- The `src\utils.py` file contains some utilities function
- Other files are API routes
- All requests must be in JSON format, for example:
```json
{
    "kana": "cute"
}
```
- Further documentations about JSON format: https://www.json.org/json-en.html
- For each mentioned API route, we will showcase the expected input (request's body) and 
the expected output (response). Every unexpected response will have `"message"` field to indicate the error

## Authentication module 
### Route: `/register`
- Request (POST): Create a new users
- Body:
```json
{
    "username": "<your username>",
    "password": "<your password>"
}
```
- Response:
```json
{
    "message": "ok",
    "userId": "<generated user's id>"
}
```

### Route `/login`
- Request (POST): User's login
- Body:
```json
{
    "username": "<your username>",
    "password": "<your password>"
}
```
- Response:
- Response:
```json
{
    "message": "ok",
    "userId": "<the respective user's id>"
}
```