#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: git feature <feature-name>"
  exit 1
fi

feature="feature/$1"
remote_feature="$(git for-each-ref --format='%(upstream:short)' refs/heads/"$feature")"

if [ "$feature" == "feature/" ]; then
  echo "Usage: git feature <feature-name>"
  exit 1
fi

echo "Feature: $feature"

if git rev-parse --quiet --verify "$feature" > /dev/null; then
  echo "Feature branch already exists."
  echo "Usage: git checkout $feature"
  exit 1
fi

echo "Checkout stable branch..."
git checkout stable

echo "Pulling latest changes..."
git pull

echo "Creating feature branch..."
git checkout -b "$feature"

if [ -n "$remote_feature" ]; then
  echo "Setting upstream to $remote_feature"
  git push --set-upstream origin "$feature"
else
  echo "No remote found. Pushing to origin."
  git push --set-upstream origin "$feature"
fi

# Add alias $ git --global alias feature="!./scripts/git-feature.sh"
