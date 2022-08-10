# Docker init

## Docker

- `docker run 'image'` run a docker image
- `docker ps` list all active Docker containers
- `docker rm image` to remove the image
- `docker logs 'container id'` show all the container logs
- `docker stop 'container id'` stop the container
- `docker run -d (detached) 'image'` run docker image detached from the terminal
- `docker run -p (port) computer-port:container-port 'image'` run docker image in a specified port
- `docker run -p (port) -v volume-path 'image'` run docker image and use an volume files

## Docker Compose

- `docker compose up` build and run our services based on Dockerfile
- `docker compose up -d` build and run our services based on Dockerfile detached from the terminal
- `docker compose up --build` will build the image with the changes
- `docker compose ps` list all active containers of our project
- `docker compose stop` stop all the containers
- `docker compose exec service-name command` will execute the command inside the service
