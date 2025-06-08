# Ducky Club

Welcome to the Ducky Club project! This repository contains the `liff` frontend application and the `liff-api` backend API, structured as a monorepo.

## Project Structure

```
ducky-club
├── apps
│   ├── liff          # Frontend application built with Remix
│   └── liff-api      # Backend API built with Hono
├── package.json       # Root package configuration
├── tsconfig.json      # Root TypeScript configuration
├── turbo.json         # Turborepo configuration
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Bun (for package management)
- Cloudflare account (for deploying the API)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ducky-club
   ```

2. Install dependencies:
   ```
   bun install
   ```

### Running the Applications

- To start the `liff` frontend application:
  ```
  cd apps/liff
  bun dev
  ```

- To start the `liff-api` backend API:
  ```
  cd apps/liff-api
  bun dev
  ```

### Deployment

- The `liff-api` can be deployed to Cloudflare Workers using the following command:
  ```
  bun run deploy
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.