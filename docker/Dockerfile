FROM node:14.17.0-slim

RUN apt update && apt install -y wget netcat git

RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

# will use the user 1000 from the node image, equivalent to the our user 1000
USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh" ]
