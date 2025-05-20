# Todo Microservice

A microservice architecture todo application built with Node.js, TypeScript, and Express.

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm run dev
```

## Building

To build the application:

```bash
npm run build
```

## Running in Production

To run the built application:

```bash
npm start
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier 