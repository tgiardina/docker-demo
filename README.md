## Docker

### Deploy Dev Env

We start by using the dev Dockerfile:

```
cp app/Dockerfile.dev app/Dockerfile
```

Build the image:

```
docker build app -t demo-app
```

`app` is the location of the application, which should be colocated with its `Dockerfile`. `-t demo-app` set the image name.

We can then run the container:

```
docker run -p 4000:3000 demo-app
```

`-p 4000:3000` tells Docker to host on `localhost:4000` whatever the container is hosting on port 3000. If you navigate to `localhost:4000`, you should see our app!

### Deploy Prod Env

We will now use the prod Dockerfile:

```
cp app/Dockerfile.prod app/Dockerfile
```

Build the new image like we did last time and then run the container:

```
docker run -p 4000:80 demo-app
```

### Complete Setup

But we don't want our dev and prod setups diverging. E.g., if dev and prod start using different versions of node, then code that works in dev won't necessarily work on prod. Fortunately, we can combine the two Dockerfiles:

```
cp app/Dockerfile.final Dockefile
```

To build the prod env, use the standard:

```
docker build app -t demo-app
```

To build the dev env, specify a target stage:

```
docker build app --target installer -t demo-app-dev
```

To run the application, we now use:

```
docker run -p 4000:3000 demo-app-dev npm start
```


## Debugging

To run a container with a name:

```
docker run -p 4000:3000 --name dev-container demo-app-dev npm start
```

To see what containers are running, use:

```
docker ps
```

To start and stop the container, use:

```
docker start dev-container
docker stop dev-container
```

To run a command in a container, use:

```
docker exec -it dev-container <command>
```

To install packges within container:

```
apk update
apk add <package>
```

You can now take advantage of CRA's hot reloading using vim: `vim src/App.js`.

To clean up unused images nad containers:

```
docker system prune
```

To kill all containers:

```
docker kill $(docker ps -q)
```

### Extra

To run a container and then detach, use the `-d` flag:

```
docker run -p 4000:3000 --name dev-container -d demo-app-dev npm start
```

Similarly, to start a container and attach to it use the `-a` flage:

```
docker start -a dev-container
```

And if you're running a detached container, you can reattach:

```
docker attach dev-container
```

## docker-compose

But a React app by itself isn't that useful. We probably want some sort of API and database as well. And it's a lot of work to spin those all up independently. docker-compose let's us coordinate all these containers in one file (similar to k8s)!

### Deploy Prod

Use the prod `docker-compose.yaml`:

```
cp docker-compose.prod.yaml docker-compose.yaml
```

Start up the containers using:

```
docker-compose up --build
```

where `--build` ensures we're working with up-to-date images.

### Deploy Dev

Same as prod, but use `docker-compose.dev.yaml` instead:

```
cp docker-compose.dev.yaml docker-compose.yaml
```

### Complete Setup
