# Set nginx base image
FROM nginx

# File Author / Maintainer
MAINTAINER Weedmaps
ARG CONF_FILE

# Copy custom configuration file from the current directory
COPY ${CONF_FILE} /etc/nginx/nginx.tmpl.conf
COPY start.sh /bin/start.sh
RUN chmod 755 /bin/start.sh

# Expose ports
EXPOSE 80
EXPOSE 443

# Define default command
CMD /bin/start.sh
