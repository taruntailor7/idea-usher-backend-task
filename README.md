# idea-usher-backend-task

#API Documentation
#This API provides endpoints to manage posts, including retrieving all posts and creating new posts.

#Base URL : https://idea-usher-backend-task.onrender.com/

#1. Get All Posts : /api/posts
Retrieves a list of blog posts with optional searching, filtering, sorting, and pagination.

URL: https://idea-usher-backend-task.onrender.com/api/posts
Method: GET
Query Parameters:
 - page (optional): Page number for pagination (default: 1)
 - limit (optional): Number of posts per page (default: 10)
 - sort (optional): Sort order for posts ('asc' or 'desc', default: 'desc')
 - keyword (optional): Search keyword for title and description
 - tag (optional): Filter posts by tag name

Response:
  Success Response: 200 OK
  jsonCopy{
    "posts": [...],
    "currentPage": 1,
    "totalPages": 3,
    "totalPosts": 25,
    "limit": 10
  }

Error Response: 400 Bad Request, 500 Internal Server Error

#2. Create Post : /api/posts/create
Creates a new blog post.

 URL: https://idea-usher-backend-task.onrender.com/api/posts/create
Method: POST
Body Parameters:
 - title (required): Post title
 - desc (required): Post description
 - tags (optional): Array of tag names
 - image (optional): URL of the post image

Response:
  Success Response: 201 Created
  jsonCopy{
    "message": "post successfully created",
    "post": {...}
  }

Error Response: 500 Internal Server Error

Additional Information:
 - The API uses MongoDB for data storage.
 - Posts are associated with tags, which are automatically created if they don't exist.
 - Images are converted to base64 format before storing.
 - Sorting is done based on the createdAt field.
 - The API implements proper error handling and parameter validation.

Thank You Idea Usher for giving me this task.
