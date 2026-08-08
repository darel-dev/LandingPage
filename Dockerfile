# Use lightweight NGINX web server image
FROM nginx:alpine

# Copy static assets to NGINX default html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
