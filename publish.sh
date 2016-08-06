#!/usr/bin/env bash
git pull
git push origin master
git checkout gh-pages
git pull
git merge master
git push origin gh-pages
git checkout master
