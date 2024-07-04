# idea-usher-backend-task

#API Documentation
1. getAllPosts
Endpoint: GET /api/posts

Description: Retrieves a list of posts based on specified query parameters.

Query Parameters:

page: Page number for pagination (default: 1).
limit: Number of posts per page (default: 10).
sort: Sorting order (asc for ascending, desc for descending).
keyword: Search term to match in post title or description.
tag: Filters posts by tag name.
Response:

json
Copy code
{
  "posts": [Array of Post Objects],
  "currentPage": Number,
  "totalPages": Number,
  "totalPosts": Number,
  "limit": Number
}
Example Request:

bash
Copy code
GET /api/posts?page=1&limit=10&sort=desc&keyword=example&tag=tech
2. createPost
Endpoint: POST /api/posts

Description: Creates a new post with provided title, description, tags, and optional image.

Request Body:

json
Copy code
{
  "title": "String",
  "desc": "String",
  "tags": ["Array of String"],
  "image": "Optional: URL of Image"
}
Response:

json
Copy code
{
  "message": "post successfully created",
  "post": {
    "title": "String",
    "desc": "String",
    "tags": ["Array of Tag IDs"],
    "image": "Base64 Encoded Image"
  }
}
Example Request:

json
Copy code
POST /api/posts
{
  "title": "Sample Title",
  "desc": "Sample Description",
  "tags": ["Tech", "Development"],
  "image": "https://example.com/sample-image.jpg"
}
Notes:
Error Handling: Proper error messages are returned for invalid requests or server errors.
Tag Management: Tags are managed by checking existing tags or creating new ones if not found.
Image Conversion: Optional image URL is converted to base64 format for storage.
