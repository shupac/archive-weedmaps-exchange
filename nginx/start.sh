#!/bin/sh

export RESOLVER_IP=$(cat /etc/resolv.conf |grep -i '^nameserver'|head -n1|cut -d ' ' -f2)

envsubst '\\$RESOLVER_IP \\$NEW_ADMIN_URL' < /etc/nginx/nginx.tmpl.conf > /etc/nginx/nginx.conf

nginx -g "daemon off;"