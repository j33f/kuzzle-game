# Kuzzle - "Arrow Hero" Demo

**Authors:** [bostalowski](https://github.com/bostalowski) & [lpoiret](https://github.com/lpoiret)

A *Guitar Hero* like game, using your keyboard arrows showing how to implement a basic but addictive real time game with levels, rooms, and two ways interractions.

# Running the demo

## Kuzzle + Demo package with Docker Compose

### Prerequisites:

* [Docker](https://docs.docker.com/installation/#installation)
* [Docker Compose](https://docs.docker.com/compose/install/)

In this directory you can use the default `docker-compose.yml` with all you need for running Kuzzle container and this demo:

```
$ docker-compose up
```

Now, you can try to use the todolist at http://localhost

## Stand alone

* A running [kuzzle](https://github.com/kuzzleio/kuzzle) instance
* (Optional) Edit the first line of the ``js/config.js`` file to configure your Kuzzle instance URL, if you don't opt for a default installation
* You can directly open the `index.html` file in your browser.

**Note:**

In order to avoid problem with Cross-Origin by opening the file directly in your browser, you can also use nginx. With docker, you can use something like:

    $ docker run -d -p 80:80 -v $(pwd)/chat/:/usr/share/nginx/html nginx
    
And access to the URL http://localhost

## License

This tutorial is published under [MIT License](LICENSE)