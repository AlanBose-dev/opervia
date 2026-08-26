# Opervia Architecture

## 1. Architecture Overview

Opervia is a configurable, multi-organization internal operations management platform.

The application uses a client-server architecture with a React frontend, Spring Boot backend, and PostgreSQL database.

The backend follows a layered architecture to separate presentation, business logic, and data access responsibilities.

## 2. Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- REST APIs
- JPA/Hibernate
- Maven

### Database
- PostgreSQL

## 3. High-Level Architecture

User
  |
  v
React Frontend
  |
  | HTTP / JSON
  v
Spring Boot REST API
  |
  v
Controller
  |
  v
Service
  |
  v
Repository
  |
  v
JPA / Hibernate
  |
  v
PostgreSQL

--------Frontend Architecture--------
User
  |
  v
React Page
  |
  v
Axios
  |
  v
REST API

----------Backend Architecture-----------
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database

---------DTO----------
CreateRequestDTO
- title
- description
- categoryId
- priority

-----------Request Flow-------------

User
  |
  v
React
  |
  | POST /api/organizations
  v
Controller
  |
  v
Service
  |
  v
Repository
  |
  v
PostgreSQL
  |
  v
Response
  |
  v
React

--------------Security Architecture------------------
Client
  |
  v
JWT
  |
  v
Spring Security
  |
  v
Protected REST API

-----------------Multi-Organization Isolation---------------

PostgreSQL
|
+-- Organization A
|     +-- Users
|     +-- Requests
|
+-- Organization B
      +-- Users
      +-- Requests


**Important:** This is **Architecture v1**, so we can update it later when our database, security, deployment, and other designs become more detailed.
