# ☁️ OpenPages Cloud Architecture

OpenPages is a cloud-native full-stack web application deployed on Microsoft Azure. The project demonstrates end-to-end deployment, storage integration, monitoring, HTTPS configuration, containerization, and cloud networking using Azure services.

---

# 🚀 Cloud Architecture

<img width="1498" height="918" alt="Screenshot 2026-06-28 114153" src="https://github.com/user-attachments/assets/2ce2a349-d6e2-408f-bdb7-95710b91a5bf" />


# ☁️ Azure Services Used

| Azure Service | Purpose |
|---------------|----------|
| Azure Virtual Machine | Backend Hosting |
| Azure Static Web Apps | Frontend Hosting |
| Azure Blob Storage | Image Storage |
| Azure Monitor | Infrastructure Monitoring |
| Azure Application Insights | Application Performance Monitoring |
| Azure DNS | Custom Domain |
| Let's Encrypt SSL | HTTPS Certificate |

---

# 🏗 Infrastructure

## Frontend

- Hosted on Azure Static Web Apps
- Automatic HTTPS
- Global CDN
- GitHub Actions based deployment
- Custom domain support

---

## Backend

Hosted inside a Docker container running on an Azure Virtual Machine.

Responsibilities:

- Authentication
- REST APIs
- Azure Blob Storage integration
- MongoDB connectivity

The backend is exposed through:

```
Nginx
        ↓
Docker Container
        ↓
Express Application
```

---

## Storage

Images are uploaded directly to Azure Blob Storage.

Upload Flow

```
Client

↓

Express API

↓

Multer

↓

Azure Blob Storage

↓

Blob URL stored inside MongoDB
```

---

## Database

MongoDB Atlas is used as a managed cloud database.

Benefits

- Automatic backups
- High availability
- Managed infrastructure
- Cloud hosted

---

# 🌐 Networking

```
User

↓

notesonline.dev

↓

Azure Static Web Apps

↓

api.notesonline.dev

↓

Nginx

↓

Docker Container

↓

MongoDB Atlas
```

---

# 🔐 Security

The application uses multiple layers of security.

- HTTPS using Let's Encrypt
- Reverse Proxy using Nginx
- HTTP-only Cookies
- JWT Authentication
- BCrypt Password Hashing
- CORS Configuration
- Environment Variables
- Azure Storage Access Keys

---

# 🐳 Containerization

Backend is fully containerized using Docker.

```
Source Code

↓

Docker Build

↓

Docker Image

↓

Docker Hub

↓

Azure VM

↓

Running Container
```

---

# 📊 Monitoring

Application monitoring is configured using Azure services.

## Azure Application Insights

Monitors

- Incoming Requests
- Failed Requests
- Response Time
- Exceptions
- Dependencies
- Live Metrics

---

## Azure Monitor

Infrastructure Monitoring

- CPU Usage
- Memory Usage
- Network Usage
- Disk Usage
- VM Availability

---

# 🚀 Deployment Pipeline

## Frontend

```
GitHub Push

↓

GitHub Actions

↓

Azure Static Web Apps

↓

Production Deployment
```

---

## Backend

```
Local Development

↓

Docker Build

↓

Docker Hub

↓

Azure Virtual Machine

↓

Docker Run

↓

Production
```

*(Backend CI/CD using GitHub Actions is planned as the next enhancement.)*

---

# 📦 Cloud Features Implemented

- Azure Static Web Apps
- Azure Virtual Machine
- Azure Blob Storage
- Azure Monitor
- Azure Application Insights
- Docker Containerization
- Reverse Proxy using Nginx
- HTTPS Configuration
- Custom Domain Mapping
- Production Environment Variables
- GitHub Actions (Frontend)
- Docker Hub Registry
- Cloud Object Storage
- Managed MongoDB Atlas Database

---

# 🔮 Future Improvements

- Backend CI/CD with GitHub Actions
- Azure Container Registry (ACR)
- Azure Container Apps / AKS
- Managed Identity
- Azure Key Vault
- Azure Front Door
- Azure CDN
- Azure Cache for Redis
- Autoscaling
- Infrastructure as Code (Terraform/Bicep)
  
---

# 🌐 Live Deployment

 URL | Status |
|-----|--------|
 www.notesonline.dev | ✅ Live |

---
