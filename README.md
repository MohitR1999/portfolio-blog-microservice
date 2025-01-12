# Blog microservice
This microservice is solely responsible for the core blog functionality of the application. User would be able to create, read, update and delete a blog

To get the service up and running, follow these steps:
- Install `docker` and `docker compose` on your machine by following the instructions mentioned on the official website of [Docker](https://docs.docker.com/engine/install/) 
- Make sure you have `git` installed. You can get it from the official website of [Git](https://git-scm.com/downloads)
- Clone this repository using `git clone` as `git clone git@github.com:MohitR1999/portfolio-blog-microservice.git`
- No dependencies are needed to be installed, everything is containerized and would be run using `docker compose`
- Set the environment variables as follows:
```
JWT_SECRET= <Your preferred JWT secret, keep it same for blog service as well>
PORT=<set it to 5001>
MONGO_INITDB_ROOT_USERNAME=<root username for mongoDB>
MONGO_INITDB_ROOT_PASSWORD=<root password for mongoDB>
MONGO_INITDB_DATABASE=portfolio
ME_CONFIG_MONGODB_ADMINUSERNAME=<admin username for mongoDB>
ME_CONFIG_MONGODB_ADMINPASSWORD=<admin password for mongoDB>
MONGODB_URL=mongodb://<username>:<password>@<mongoDB service name which is present in the docker compose file>:27017/portfolio
ME_CONFIG_BASICAUTH=true
```
- For bringing the services up, without getting your terminal occupied, run `docker compose up -d`
- For bringing the services up, attaching your terminal to the logs, run `docker compose up`
- In case you're running the service with the terminal detached, run `docker compose down` to stop the services.
- If you're developing and need hot reload, run `docker compose up --watch`. This will start the services in watch mode, and any change in code will result in a rebuilt of the image and container would be restarted
- To run the unit tests, run `npm run test`. This will execute all the tests inside the `tests` directory. Before running the tests, ensure that the services are stopped, because the tests mock everything and don't depend on the containerized database service
# API Endpoints
Following API endpoints are working as of now:
#### Creating a new blog

<details>
 <summary><code>POST</code> <code><b>/api/blogs</b></code> <code>(Creates a new blog with the provided details)</code></summary>

##### Parameters

> None

##### Headers

> | Header                  | Content                     |
> |-------------------------|-----------------------------|
> | `Authorization`         | `Bearer <JWT_Token>`        |

##### Body

> ```json
> {
>     "title" : "My blog!",
>     "content" : "Hello this is a new blog"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                                       |
> |---------------|-----------------------------------|--------------------------------------------------------------------------------|
> | `201`         | `application/json`                | `{"title": "My blog!","content": "Hello this is a new blog","author": <author_id>,"_id": <blog_id>,"created_at": "2025-01-04T13:30:24.419Z","__v": 0 }`  |
> | `400`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `500`         | `application/json`                | `{"error": <error_message>}`                                                   |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5001/api/blogs/' --header 'Content-Type: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.***********************.UCPIOk8zg2be2KW33CL-**************-gEIT7l_k' --data '{"title":"My blog!","content":"Hello this is a new blog"}'
> ```

##### Example response

>```json
> {
>     "title": "My blog!",
>     "content": "Hello this is a new blog",
>     "author": "6775277a20d4082bb2730063",
>     "_id": "677937f0a19657fa3ac31f70",
>     "created_at": "2025-01-04T13:30:24.419Z",
>     "__v": 0
> }
>```

</details>

#### Fetching all blogs by a specific user

<details>
 <summary><code>GET</code> <code><b>/api/blogs</b></code> <code>(Fetches all the blogs in the database, created by a specific user)</code></summary>

##### Headers

> | Header              | Content                     |
> |---------------------|-----------------------------|
> | `x-user-id`         | `<User id of the author>`   |

##### Parameters

> None

##### Body

> None

##### Responses

> | http code     | content-type                      | response                      |
> |---------------|-----------------------------------|-------------------------------|
> | `200`         | `application/json`                | `[{"title": <blog1_title, "content" : <blog1_content, ...}, {"title": <blog2_title, "content" : <blog2_content, ...}... ]`     |
> | `500`         | `application/json`                | `{"error": <error_message> }`  |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5001/api/blogs' --header 'x-user-id: 678386121d2fcfc09d115d75'
> ```

##### Example response

>```json
> [
>     {
>         "_id": "677937f0a19657fa3ac31f70",
>         "title": "My blog!",
>         "content": "Hello this is a new blog",
>         "author": "678386121d2fcfc09d115d75",
>         "created_at": "2025-01-04T13:30:24.419Z",
>         "__v": 0
>     }
> ]
>```

</details>

#### Get a specific blog

<details>
 <summary><code>GET</code> <code><b>/api/blogs/:id</b></code> <code>(Fetches a specific blog by its unique id)</code></summary>

##### URL Parameters

> | Parameter     | Value                      |
> |---------------|----------------------------|
> | `id`          | Unique ID of the blog      |

##### Body

> None

##### Headers

> None

##### Responses

> | http code     | content-type                      | response                                      |
> |---------------|-----------------------------------|-----------------------------------------------|
> | `200`         | `application/json`                | `{"title": <blog1_title, "content" : <blog1_content, ...}`                           |
> | `404`         | `application/json`                | `{ error: <error_message> }`  |
> | `500`         | `application/json`                | `{ error: <error_message> }`  |

##### Example cURL

> ```bash
>  curl --location 'http://localhost:5001/api/blogs/677937f0a19657fa3ac31f70' --data ''
> ```

##### Example response

>```json
> {
>     "_id": "677937f0a19657fa3ac31f70",
>     "title": "My blog!",
>     "content": "Hello this is a new blog",
>     "author": "6775277a20d4082bb2730063",
>     "created_at": "2025-01-04T13:30:24.419Z",
>     "__v": 0
> }
>```

</details>

#### Modify a specific blog by its ID

<details>
 <summary><code>PUT</code> <code><b>/api/blogs/:id</b></code> <code>(Modifies the existing blog specified by its id)</code></summary>

##### URL Parameters

> | Parameter     | Value                      |
> |---------------|----------------------------|
> | `id`          | Unique ID of the blog      |


##### Headers

> | Header                  | Content                     |
> |-------------------------|-----------------------------|
> | `Authorization`         | `Bearer <JWT_Token>`        |

##### Body

> ```json
> {
>     "title" : "My blog!",
>     "content" : "Hello this is a new modified blog"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                                       |
> |---------------|-----------------------------------|--------------------------------------------------------------------------------|
> | `201`         | `application/json`                | `{"title": "My blog!","content": "Hello this is a new modified blog","author": <author_id>,"_id": <blog_id>,"created_at": "2025-01-04T13:30:24.419Z", "modified_at": "2025-01-04T13:47:16.483Z", "__v": 0 }`  |
> | `400`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `404`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `500`         | `application/json`                | `{"error": <error_message>}`                                                   |

##### Example cURL

> ```bash
>  curl --location --request PUT 'http://localhost:5001/api/blogs/677937f0a19657fa3ac31f70' --header 'Content-Type: application/json' --header 'Authorization: Bearer <token>' --data '{"content":"Hello, this is some completely new content for my first blog hehe!"}'
> ```

##### Example response

>```json
> {
>     "_id": "677937f0a19657fa3ac31f70",
>     "title": "My blog!",
>     "content": "Hello, this is some completely new content for my first blog hehe!",
>     "author": "6775277a20d4082bb2730063",
>     "created_at": "2025-01-04T13:30:24.419Z",
>     "__v": 0,
>     "modified_at": "2025-01-04T13:47:16.483Z"
> }
>```

</details>

#### Delete a specific blog by its ID

<details>
 <summary><code>DELETE</code> <code><b>/api/blogs/:id</b></code> <code>(Deletes the specific blog by the given id)</code></summary>

##### URL Parameters

> | Parameter     | Value                      |
> |---------------|----------------------------|
> | `id`          | Unique ID of the blog      |


##### Headers

> | Header                  | Content                     |
> |-------------------------|-----------------------------|
> | `Authorization`         | `Bearer <JWT_Token>`        |

##### Body

> None

##### Responses

> | http code     | content-type                      | response                                                                       |
> |---------------|-----------------------------------|--------------------------------------------------------------------------------|
> | `201`         | `application/json`                | `{ "message": "Blog deleted successfully" }`  |
> | `400`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `404`         | `application/json`                | `{"error": <error_message>}`                                                   |
> | `500`         | `application/json`                | `{"error": <error_message>}`                                                   |

##### Example cURL

> ```bash
>  curl --location --request DELETE 'http://localhost:5001/api/blogs/677937f0a19657fa3ac31f70' --header 'Authorization: Bearer <token>'
> ```

##### Example response

>```json
> {
>     "message": "Blog deleted successfully"
> }
>```

</details>
