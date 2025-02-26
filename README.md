## Project Overview

This application empowers users to transform wireframe images into functional code using the power of AI. Users can upload a wireframe image, provide a description, and select an AI model to generate the corresponding code. The generated code can then be reviewed and edited within the application. The application utilizes a database to store user information and the generated code, allowing users to manage their projects.

## Getting Started

First, clone the repository:

```bash
git clone <repository_url>
cd <repository_directory>
```

Then, install the dependencies:

```bash
npm install # or yarn install or pnpm install or bun install
```

Create a `.env.local` file in the root directory and populate it with the environment variables from `.env.example`. You'll need to provide the actual values for your Firebase, NeonDB, and OpenRouter API configurations.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



## API Endpoints

*   `/api/ai-model`:
    *   `POST`: Accepts a wireframe image URL and description, and returns generated code from the specified AI model. Requires `OPENROUTER_AI_API_KEY` environment variable.
*   `/api/user`:
    *   `GET`: Retrieves user data.
    *   `POST`: Creates a new user.
*   `/api/wireframe-to-code`:
    *   `GET`: Retrieves wireframe-to-code data based on either `uid` or `email`.
    *   `POST`: Creates a new wireframe-to-code entry.
    *   `PUT`: Updates the code for a specific wireframe-to-code entry.

## Features

*   **Authentication:** Secure user authentication using Firebase, allowing users to create and manage their accounts.
*   **Wireframe-to-Code Generation:** Core functionality to generate code from wireframe images, enabling rapid prototyping and development.
*   **AI Model Integration:** Leverages powerful AI models (Gemini Google, llama By Meta) through the OpenRouter API to provide accurate and customizable code generation.
*   **Database Integration:** Utilizes NeonDB to store user data, wireframe images, generated code, and project metadata, ensuring data persistence and organization.
*   **UI Components:** Implements a modern and responsive user interface using Radix UI components, providing a seamless user experience across devices.
*   **Responsive Design:** Ensures optimal viewing and interaction experience across various screen sizes and devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
