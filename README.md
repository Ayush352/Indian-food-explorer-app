# Indian Food Explorer

This repository contains a React client and a simple Express server that serves Indian food data and authentication endpoints used by the client during development.

## Requirements

- Node.js (18+ recommended)
- npm (8+ recommended)

## Quick setup

1. Clone the repository (if you haven't already):

	git clone https://github.com/Ayush352/Indian-food-explorer-app.git
	cd Indian-food-explorer-app

2. Install dependencies for server and client:

	# Install server dependencies
	cd server
	npm install

	# In a separate terminal, install client dependencies
	cd ../client
	npm install

3. Start the backend server (port 5000):

	cd server
	npm run dev

	You should see a log similar to:

	✅ Server running on http://localhost:5000

4. Start the React development server (port 3000):

	cd client
	npm start

	The client uses the CRA proxy setting to forward API requests to the backend at http://localhost:5000. The `proxy` setting is in `client/package.json`.

5. Open the app in your browser at http://localhost:3000

## Scripts

- Server:
  - `npm start` — run `node src/server.js`
  - `npm run dev` — run `nodemon src/server.js` (recommended for development)
- Client:
  - `npm start` — runs the CRA dev server

## API endpoints (development)

- POST /api/auth/signup — register (body: { username, password })
- POST /api/auth/login — login (body: { username, password })
- GET /api/dishes — returns all dishes
- GET /api/dishes/:id — returns a dish by id
- POST /api/dishes/suggest — suggest dishes (body: { ingredients: ["tomato","onion"] })

## Troubleshooting

- Proxy errors in the browser console like:

  Proxy error: Could not proxy request /api/auth/login from localhost:3000 to http://localhost:5000 (ECONNREFUSED or ECONNRESET)

  Usually means the React dev server couldn't connect to the backend. Fixes:

  1. Make sure the backend is running on port 5000 before starting the client:

	  cd server
	  npm run dev

  2. If you still see errors, check the backend terminal for crash stack traces. An exception can cause the connection to reset.

  3. Confirm the proxy setting in `client/package.json`:

	  "proxy": "http://localhost:5000"



## Development tips

- Keep server and client running in separate terminals while developing.
- Use `npm run dev` in the server to enable automatic restarts with `nodemon` when you change server files.
- Commit your changes often and make sure you add staged files (`git add .`) before `git commit` and `git push`.

# Indian-food-explorer-app