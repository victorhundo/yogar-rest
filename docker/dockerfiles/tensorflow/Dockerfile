FROM tensorflow/tensorflow:1.1.0

RUN mkdir -p /tf_files/positions

WORKDIR /tf_files

RUN curl -O https://raw.githubusercontent.com/tensorflow/tensorflow/r1.1/tensorflow/examples/image_retraining/retrain.py && \
    curl -L https://goo.gl/3lTKZs > label_image.py

RUN apt-get update && apt-get install -yq \
  nodejs \
  build-essential \
  npm \
&& rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon

RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY ./ml-images.zip /
COPY ./entrypoint.sh /
CMD [ "bash", "/entrypoint.sh"]
