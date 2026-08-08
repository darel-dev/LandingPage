# 🐳 Docker Implementation Guide — Nexus Petroleum Landing Page

This document provides a step-by-step technical guide on how Docker was implemented to containerize and serve the Nexus Petroleum static web landing page using NGINX Alpine.

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Configuration Files](#configuration-files)
   - [Dockerfile](#dockerfile)
   - [.dockerignore](#dockerignore)
3. [Building and Running the Container](#building-and-running-the-container)
4. [Verification & Testing](#verification--testing)
5. [Container Lifecycle Commands](#container-lifecycle-commands)
6. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🏗️ Architecture Overview

The application is a high-performance, single-page static website (HTML, CSS, JavaScript). 

- **Base Image**: `nginx:alpine` (Ultra-lightweight Linux distribution based on Alpine Linux with NGINX pre-configured).
- **Size Impact**: Extremely small image size (~25MB total), fast pull and build times.
- **Port Mapping**: Host port `8080` mapped to Container HTTP port `80`.

---

## 📄 Configuration Files

### 1. `Dockerfile`
The `Dockerfile` defines the container configuration and build steps.

```dockerfile
# Use lightweight NGINX web server image
FROM nginx:alpine

# Copy static assets to NGINX default html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
```

#### Line-by-Line Explanation:
- `FROM nginx:alpine`: Downloads the minimal official NGINX image built on Alpine Linux.
- `COPY . /usr/share/nginx/html`: Copies all frontend assets (`index.html`, `styles.css`, `script.js`) into NGINX's default document root directory.
- `EXPOSE 80`: Informs Docker that the container listens on port 80 at runtime.
- `CMD ["nginx", "-g", "daemon off;"]`: Runs NGINX in the foreground so the container stays running.

---

### 2. `.dockerignore`
The `.dockerignore` file prevents non-essential files and metadata from being included in the Docker build context, optimizing build speed and security.

```plaintext
.git
.gitignore
Dockerfile
.dockerignore
README.md
DOCKER.md
```

---

## 🚀 Building and Running the Container

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

---

### Step 1: Build the Docker Image
Open your terminal in the repository root directory (`LandingPage`) and run:

```bash
docker build -t nexus-landing-page .
```

### Step 2: Run the Docker Container
Launch the container in detached mode (`-d`) mapping port `8080` on your host machine to port `80` inside the container:

```bash
docker run -d -p 8080:80 --name nexus-landing nexus-landing-page
```

---

## 🔍 Verification & Testing

### 1. Browser Access
Open your browser and navigate to:
```http
http://localhost:8080
```

### 2. Terminal Response Check (cURL)
You can verify that NGINX is serving the website correctly by running:

```bash
curl.exe -I http://localhost:8080
```

**Expected Output:**
```http
HTTP/1.1 200 OK
Server: nginx/1.31.3
Content-Type: text/html
...
```

---

## 🛠️ Container Lifecycle Commands

| Command | Action |
| :--- | :--- |
| `docker ps` | List all running containers |
| `docker logs nexus-landing` | View NGINX access and error logs |
| `docker stop nexus-landing` | Gracefully stop the running container |
| `docker start nexus-landing` | Restart a stopped container |
| `docker rm -f nexus-landing` | Force stop and remove the container |
| `docker rmi nexus-landing-page` | Remove the built Docker image |

---

## ❓ Troubleshooting Guide

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `cannot connect to the Docker daemon` | Docker Desktop service is offline | Open Docker Desktop and wait until Engine Status shows "Running". |
| `port is already allocated` | Port `8080` is in use by another application | Run on a different port: `docker run -d -p 8081:80 --name nexus-landing nexus-landing-page` |
| Changes in code not reflecting | Image needs to be rebuilt | Stop container, run `docker build -t nexus-landing-page .` and start a new container. |
