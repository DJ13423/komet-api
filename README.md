# Komet API

A lightweight database and WebSocket API server built with Node.js, Express, and LevelDB.

## Description

Komet API provides simple key-value and array storage with REST API access. It's designed to be straightforward to use and deploy, offering both persistent storage and real-time communication capabilities.

## Features

- **Database Operations**: Store and retrieve key-value data
- **Limited Database**: Key-value store with optional expiration
- **Array Database**: Array-based data storage
- **Limited Array Database**: Array storage with expiration support
- **WebSocket Broadcasting**: Real-time communication capabilities

## Installation

```bash
# Clone the repository
git clone https://github.com/DJ13423/komet-api.git

# Navigate to project directory
cd komet-api

# Install dependencies
npm install
```

## Usage

### Starting the server

```bash
# Build the project
npm run build

# Start the server (default port 8080)
npm start

# Start on a custom port
node compiled/src/index.js 3000
```

### API Endpoints

The API is available under the `/api` path with the following routes:

- `/api/v1/database` or `/api/v1/db`: Standard key-value database
- `/api/v1/limited-database` or `/api/v1/ldb`: Key-value database with expiration support
- `/api/v1/array-database` or `/api/v1/adb`: Array-based storage
- `/api/v1/limited-array-database` or `/api/v1/ladb`: Array storage with expiration
- `/api/v1/broadcast`: WebSocket broadcasting functionality

### Testing

```bash
npm test
```

## Technologies

- Node.js
- TypeScript
- Express.js
- LevelDB
- WebSockets (express-ws)
- Jest (testing)

## License

ISC

## Author

DJ 
