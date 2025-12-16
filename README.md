


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Netlify

1. **Push to GitHub/GitLab/Bitbucket:**
   Make sure your project is on a Git repository.

2. **Create a new site on Netlify:**
   - Log in to your Netlify account.
   - Click on "New site from Git".

3. **Configure the site:**
   - Choose your Git provider and select your repository.
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Environment variables:**
     - Add a new variable with the key `GEMINI_API_KEY` and set its value to your Gemini API key.

4. **Deploy:**
   - Click the "Deploy site" button.
