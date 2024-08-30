# nasa-play

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A project to deep-dive into Node.js and its ecosystem.

## Table of Contents

- [Introduction](#introduction)
- [Goals](#goals)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to the **nasa-play**! This repository is dedicated to my journey of learning Node.js and the many concepts and tools used for back-end development. The aim of this project is to document, practice, and share knowledge as I explore new concepts, technologies, and skills.

Whether you’re a beginner looking to understand the basics or an experienced developer wanting to deepen your understanding, this project is designed to provide useful resources for how one would build their Node app.

## Goals

The primary goals of this project include:

- **Understanding the fundamentals of Node.js**.
- **Building a web app that follows best-practices and concepts for clean and scalable architecture**.
- **Documenting the learning process** to create a valuable resource for myself and others.
- **Sharing insights and best practices** learned along the way.

## Technologies

This project explores and uses the following technologies:

- **Programming Language**: JavaScript and 
- **Frameworks/Libraries**: React, Express, Mongoose, Axios
- **Tools**: Git, Docker, VSCode
- **OThers**:  MongoDB

### Project Structure

The project is organized as follows:

```plaintext
.
├── client/             # React Single-Page Application
├── server/             # Express API
├── notes/              # Summaries of concepts and tools
├── package.json        # Has scripts to build and run both client and server
└── README.md           # This README file

### How to start the project

```
git clone https://github.com/marvinsjsu/nasa-play.git
cd nasa-play
npm install
```

#### To run for development
```
npm run watch
```

#### To deploy for production
```
npm run deploy
```

### To deploy for production (with clustering)
```
npm run deploy-cluster
```
