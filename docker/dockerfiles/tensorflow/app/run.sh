#!/bin/bash

FILENAME=$1
cd /tf_files
python label_image.py $FILENAME
rm $FILENAME
cd - > /dev/null
