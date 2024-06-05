# 💻 PodProse

[![Discord](https://img.shields.io/discord/1056947417842454678?label=DISCORD%20SERVER&logo=discord&style=for-the-badge)](https://discord.gg/FVaPTTs7MY)
![Language count](https://img.shields.io/github/languages/count/LitoHDD/PodProse?label=%F0%9F%8C%8E%20LANGUAGES&style=for-the-badge)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/LitoHDD/PodProse?color=orange&label=%F0%9F%93%A2%20LAST%20VERSION&style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/LitoHDD/PodProse?style=for-the-badge)

## 📝 Description

PodProse is a podcast platform designed to provide engaging, informative, and entertaining content. Focusing on captivating narratives, we cover a variety of topics from culture to education and current events. Our mission is to create a space where listeners can find thought-provoking stories and insights.

## 🎯 Project Objectives

The main objectives of PodProse are:

- To deliver high-quality podcast content that informs, entertains, and inspires our audience.
- To create a community of listeners and content creators who share a passion for storytelling.
- To offer an intuitive and accessible platform for discovering and enjoying podcasts.

## 🔧 Technologies Used

![HTML](https://img.shields.io/badge/HTML-%23e34c26.svg?logo=html5&logoColor=white&style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-%23563d7c.svg?logo=css3&logoColor=white&style=for-the-badge)
![React&JavaScript](https://img.shields.io/badge/JavaScript-%23f1e05a?style=for-the-badge&logo=React&logoColor=white&label=React)
![NestJS](https://img.shields.io/badge/NestJS-Node.js-%23d9224c?style=for-the-badge&logo=NestJS&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-DB-%2300628c?style=for-the-badge&logo=MySQL&logoColor=white)

## 🤝 Contributors

[![Contributors](https://contrib.rocks/image?repo=LitoHDD/PodProse&max=12)](https://github.com/LitoHDD/PodProse/graphs/contributors)  
[![GitHub contributors](https://img.shields.io/github/contributors/LitoHDD/PodProse?style=for-the-badge)](https://github.com/LitoHDD/PodProse/graphs/contributors)

## 📄 License

This project is under the MIT License. For more information, please refer to the LICENSE file.

## 🔰 Let's Get Started

To get involved with PodProse, start by exploring our content on the platform. Creators interested in contributing their podcasts can reach out via our Discord server or follow the instructions on our GitHub repository for content submission.

## 📝 Additional Notes

For more detailed information about PodProse and its features, please refer to the README.md file located at the root of the repository. Our Discord server is also a great place for help and discussions with other developers and content creators.

## 🚀 How to Start the Application

### Requirements

- MySQL:

  - Server
  - Shell

- NodeJs

  - NPM

### Docker

- Build Docker image:

    ```bash
    docker build -t mysql-image .
    ```

- Run Docker container:

    ```bash
    docker run --name mysql-container -d -p 3306:3306 -v mysql-data:/var/lib/mysql mysql-image
    ```

- Dockerfile

    ```Dockerfile
    FROM mysql:latest
    
    # Set the root password (change it to whatever you want)
    ENV MYSQL_ROOT_PASSWORD=password
    
    # Exposes port 3306 so it can be accessed from other machines
    EXPOSE 3306
    
    # Custom MySQL configuration
    RUN echo "[mysqld]\nbind-address = 0.0.0.0" > /etc/mysql/my.cnf
    
    # Create a directory for the volume where the data will be stored
    VOLUME /var/lib/mysql
    
    # CMD to start MySQL automatically when starting container
    CMD ["mysqld", "--user=mysql", "--console"]
    ```

### Api Installation

- Install dependencies:

   ```bash
   npm i
   ```

### Database Setup

- Create tables:

   ```bash
   npx prisma migrate dev
   ```

- Insert required data:

   ```bash
   npm run megafactory
   ```

- Open graphical environment:

   ```bash
   npx prisma studio
   ```

### Running the Api

- Watch mode:

   ```bash
   npm run start:dev
   ```

### Api Documentation

Access the Swagger UI for Api documentation at:
[http://localhost:3000/api/](http://localhost:3000/api/)

### App Installation

- Install dependencies:

   ```bash
   npm i
   ```

### Running the App

- Watch mode:

   ```bash
   npm run dev
   ```
