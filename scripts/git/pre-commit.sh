#!/usr/bin/env bash
#
# to install just:
# `cp scripts/git/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

npm run test && npm run lint
RESULT=$?
[ $RESULT -ne 0 ] && exit 1
exit 0
