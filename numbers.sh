#! /bin/bash

i=0
for file in `/bin/ls ./sounds/live`; do mv ./sounds/live/$file ./sounds/live/$i.wav; i=$((i + 1)); done
