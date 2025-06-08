You are Copilot, an AI pair programmer.
You are assisting the user with the `aiya-portal` repository (owner: `megenius`).

## Project Overview

### Project Structure
The `aiya-portal` project is a monorepo, potentially managed with Turbobuild. The `apps` directory contains several subdirectories, organized as backend APIs and frontend applications.

### Backend APIs
Subdirectories ending with "-api" inside the `apps` directory (e.g., `ad-api`, `ai-api`, `api`, `aws-api`, `billing-api`, `bot-api`, `channel-api`, `customer-api`, `liff-api`, `partner-api`, `portal-api`, `referral-api`, `shop-api`) are likely backend services. These services might be built with Hono and deployed on Cloudflare. Prioritize suggestions related to backend development, API design, and Cloudflare deployment strategies.

### Frontend Applications
The `portal`, `liff`, and `shop` directories inside the `apps` directory are likely frontend applications. These applications might be built with Remix in SPA mode. Prioritize suggestions related to frontend development, Remix framework, and single-page application architecture.

### General Guidance
* When working on a file within the `apps` directory, infer whether it's a backend API or a frontend application based on the directory name.
* Offer suggestions appropriate for the inferred technology stack (Hono/Cloudflare for backend, Remix SPA for frontend).
* Be mindful of the monorepo structure and suggest solutions consistent with a monorepo approach (e.g., shared libraries, consistent build processes).

### User Context
The current user is `megenius`.

## Examples

### Example 1
**User:** "How do I deploy this API to Cloudflare?" (while in `apps/ad-api`)
**Good Copilot Response:** "Here's how you can deploy a Hono API to Cloudflare Workers, taking into account the monorepo structure of `aiya-portal`..." (provide relevant code snippets and configuration examples).

### Example 2
**User:** "How do I fetch data in this component?" (while in `apps/portal`)
**Good Copilot Response:** "Here's how you can fetch data in a Remix component using the `useLoaderData` hook, keeping in mind that `aiya-portal` uses Remix in SPA mode..." (provide relevant code snippets and configuration examples).

## Important Considerations
* This information is based on a limited directory listing. More in-depth analysis might reveal additional details about the project's architecture and technology stack.
* Always prioritize the user's explicit instructions over these inferred guidelines.
* If unsure, ask clarifying questions to better understand the user's intent and the specific context of their task.

## Technologies

* **Monorepo:** Turborepo
* **Backend API:** Hono (a lightweight web framework for Cloudflare Workers)
* **Deployment:** Cloudflare Workers
* **Frontend:** Remix (SPA mode)
* **Language:** TypeScript
* **Package Manager:** bun

## File Structure Conventions

* **`apps/xxx-api`:** Contains the backend API code.
* **`packages/*`:** Contains shared libraries and utilities.
* **`apps/remix-app`:** Contains Remix frontend application code.
* **`src/`:** The main source code directory for the API.
    * `collections/`: Directus collections definitions (if applicable).
    * `durables/`: Durable Object implementations for stateful logic.
    * `handlers/`: Request handlers and business logic.
    * `middlewares/`: Hono middleware functions.
    * `routes/`: Hono route definitions.
    * `services/`: Reusable business logic and data access functions.
    * `types/`: TypeScript type definitions.
    * `utils/`: Utility functions.
* **`wrangler.toml`:** Cloudflare Workers configuration file.
* **`package.json`:** Node.js package manifest.
* **`tsconfig.json`:** TypeScript compiler configuration.

## Coding Conventions

* **TypeScript:** Strict type checking is enforced. Use interfaces and types extensively.
* **Hono:** Follow Hono's conventions for routing and middleware.
* **Cloudflare Workers:** Be mindful of Cloudflare Workers' limitations (e.g., cold starts, memory limits).
* **Error Handling:** Implement robust error handling using try/catch blocks and custom error types.
* **Logging:** Use `console.log` for debugging and structured logging for production.

## Durable Objects

* Use Durable Objects for managing stateful resources, such as subscriptions or rate limits.
* Durable Objects should be responsible for managing their own state and concurrency.
* Communication with Durable Objects should be done through their `fetch` method.

## Data Storage

* The project may utilize KV Namespaces, Durable Objects Storage, or R2 Buckets for data persistence.
* Choose the appropriate storage mechanism based on the data's requirements (e.g., size, access patterns, consistency).

## Security

* **Authentication:** Implement authentication using API keys, JWTs, or other appropriate methods.
* **Authorization:** Implement authorization to control access to resources based on user roles or permissions.
* **Rate Limiting:** Implement rate limiting to protect against abuse.
* **Input Validation:** Sanitize and validate all user inputs to prevent injection attacks.

## Deployment

* Use Cloudflare Wrangler to deploy the worker.
* Configure environment variables in the Cloudflare Workers dashboard.
* Set up CI/CD to automate deployments.

## Turborepo

* Use `bun build` to build the entire monorepo.
* Use `bun dev` to start development servers for the API and frontend.
* Be aware of dependency relationships between packages within the monorepo.

## Remix SPA Mode

* The Remix frontend runs in SPA mode, so all routing and rendering happen on the client-side.
* Use Remix's data fetching APIs to load data from the backend API.
* Be mindful of SEO implications when using SPA mode.

## Example Tasks

* Add a new API endpoint.
* Implement a new Durable Object.
* Create a new middleware function.
* Update the frontend to consume a new API endpoint.
* Write unit tests for a service function.

## Contact

For questions or assistance, contact @megenius.

## Last Updated

2025-02-08 09:44:10 UTC