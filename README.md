#  Nothing News Network

A playful AI-powered news generator that turns trivial events into absurd broadcast headlines.

## Project structure

- `Backend/server.js` - Express backend serving the frontend and `/api/generate-news`.
- `Frontend/index.html` - Static UI and AI prompt/frontend logic.
- `.env.example` - Example environment file for the secret API key.

## Local setup

1. Copy `.env.example` to `.env`:

   ```bash
   copy .env.example .env
   ```

2. Add your Groq API key to `.env`:

   ```text
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. Install dependencies from the project root:

   ```bash
   npm install
   ```

4. Start the app:

   ```bash
   npm start
   ```

5. Open the app:

   ```text
   http://localhost:3000
   ```

## Deployment

This app is ready for deployment to any Node.js-compatible host.

- The root `package.json` includes a `start` script:
  - `npm start` runs `Backend/server.js`
- The backend serves the static frontend automatically.
- Keep the `.env` file secret and do not commit it.

## Notes

- If your browser opens Live Server on port `5500`, use `http://localhost:3000` instead.
- Make sure `GROQ_API_KEY` is defined in `.env` before starting the server.
