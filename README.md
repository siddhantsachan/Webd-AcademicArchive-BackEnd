# Webd-AcademicArchive-BackEnd

Technologies Used
1-Node.js: JavaScript runtime environment.
2-Express.js: Web framework for Node.js.
3-Mongoose: MongoDB object modeling for Node.js.
4-jsonwebtoken (JWT): Authentication mechanism for secure login.
5 MongoDB: NoSQL database for storing user data, submissions, and questions.

# API EndPoints

```json
{
  "msg": "success message for the developer",
  "data": {
    "data received from server will be here"
  }
}
```

An error response from the server will look like this:

```json
{
  "error": "Error message for the developer",
}
```
> For Authorized routes send the jwt token as bearer token in request header

## User Authentication

### Register

URL: /auth/register
Method: POST
Authorized: False
Request Body:
email: String
password: String
role: String (either admin or student)
Success Status Code: 200
- **Response Data:**

    ```json
    {
      "message": "User registered"
    }

    ```

### Login

URL: /auth/login
Method: POST
Authorized: False
Request Body:
email: String
password: String
Success Status Code: 200

- **Response Data:**

    ```json
   {
      "token": "<JWT token>"
   }


    ```

## Student Routes
### Submit Work
URL: /student/submit

Method: POST

Authorized: True (Student)

Request Body:

content: String (The student's submission content)
Success Status Code: 200

- **Response Data:**

    ```json
   {
    "message": "Submission successful",
    "submission": { }
   }



    ```

### View Questions
URL: /student/questions

Method: GET

Authorized: True (Student)

Query Parameters: (Optional)

category: String (Filter questions by category)
Success Status Code: 200

- **Response Data:**

    ```json
   [
    {
      "_id": "submissionId1",
      "studentId": "studentId1",
      "content": "My first submission",
      "status": "pending",
      "__v": 0
    },
    {
      "_id": "submissionId2",
      "studentId": "studentId1",
      "content": "My second submission",
      "status": "accepted",
      "__v": 0
    }
  ]




    ```

### Search Questions
URL: /student/search-questions

Method: GET

Authorized: True (Student)

Query Parameters:

content: String (Search term in question content)
Success Status Code: 200
   
- **Response Data:**

    ```json
   [
    {
      "_id": "questionId1",
      "year": 2023,
      "category": "Math",
      "content": "Solve this equation."
    }
  ]

    ```
### View My Submissions
URL: /student/my-submissions

Method: GET

Authorized: True (Student)

Success Status Code: 200

- **Response Data:**

    ```json
   {
      "msg": "Submissions retrieved successfully",
      "status": "success",
      "data": {
          "submissions": [
              {
                  "_id": "<submission_id>",
                  "studentId": "<student_id>",
                  "content": "My first submission",
                  "status": "pending"
              },
              {
                  "_id": "<submission_id>",
                  "studentId": "<student_id>",
                  "content": "My second submission",
                  "status": "accepted"
              }
          ]
      }
  }


    ```
## Admin Routes
### Accept/Reject Submission
URL: /admin/review/:id
Method: POST
Authorized: True (Admin)
Request Body:
status: String (Either accepted or rejected)
Success Status Code: 200
- **Response Data:**

    ```json
  {
    "message": "Submission updated",
    "submission": { }
  }


    ```

## Question Routes
### Add Question
URL: /questions/add
Method: POST
Authorized: True (Admin)
Request Body:
content: String
year: Number
category: String
Success Status Code: 200

- **Response Data:**

    ```json
  {
      "msg": "Question added successfully",
      "status": "success",
      "data": {
          "_id": "<question_id>",
          "content": "What is the capital of France?",
          "year": 2023,
          "category": "Geography"
      }
  }



    ```
### Get All Questions
URL: /questions
Method: GET
Authorized: True (Admin/Student)
Success Status Code: 200

- **Response Data:**

    ```json
  [
      {
        "_id": "questionId1",
        "year": 2023,
        "category": "Math",
        "content": "ax+by=4"
      }
    ]
    ```

