#!/bin/bash

rm -rf /tf_files/positions/*
cd /tf_files/positions
  # curl http://yogar.splab.ufcg.edu.br/_static/ml-images.zip --output ml-images.zip
  # if [ $? != 0 ]; then
  #   cp /ml-images.zip .
  # fi
   cp /ml-images.zip .
  unzip ml-images.zip
  rm ml-images.zip
cd -

python -m retrain \
  --bottleneck_dir=bottlenecks \
  --how_many_training_steps=500 \
  --model_dir=models/ \
  --summaries_dir=training_summaries/"${ARCHITECTURE}" \
  --output_graph=retrained_graph.pb \
  --output_labels=retrained_labels.txt \
  --architecture="${ARCHITECTURE}" \
  --image_dir=positions

cd /app

nodemon \
    --ext js \
    --watch ./  \
    --exec 'npm start || true' \
    --delay 1

tail -f /dev/null
