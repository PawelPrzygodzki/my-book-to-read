# My Book To Read 

Simple web "My Books To Read" application that allows the user to add and view a list of books.

## TODO 

- [X] Dockerize app

## Requirements

Application has been tested on:

Node.js -> v20.10.*

## Development

### Local run 

Install all dependencies for backend and frontend part 

Run backend service in one terminal (Instruction in backend/README.md)
Run frontend service in another terminal (Instruction in frontend/README.md)
Open http://localhost:3000 in your browser

### Run locally with docker 

Run
```
docker-compose up --build
```

Docker will build backend, frontend app and postgres database when finish open http://localhost:3000 in your browser
