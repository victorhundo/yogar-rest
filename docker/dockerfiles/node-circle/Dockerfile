FROM node:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
    mysql-client \
    git \
&& rm -rf /var/lib/apt/lists/*

RUN npm i npm@latest -g
RUN npm install -g nodemon mocha
EXPOSE 3000


RUN git clone https://github.com/victorhundo/yogar-rest.git /app && \
  cd /app && \
npm install


COPY ./entrypoint.sh /
CMD [ "bash", "/entrypoint.sh"]
