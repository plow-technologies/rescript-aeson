#!/bin/bash

for file in lib/bs/examples/*.js; do
  node "$file"
done