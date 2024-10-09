<!-- Readme for ProFlow. A Project Management Tool built using Next.js & TypeScript where users create accounts or login through Google OAuth and can create mutliple projects, add members to them and assign them tasks. The tasks can have description, priority, labels like [To do, In Progress, In Review, Done] too. The project creation can be assisted with Google Gemini AI integration that automatically generates tasks based on the project title and description. The tasks can be viewed in list view and kanban view where users can drag and drop items to change task categories and details seamlessly. Tasks can be grouped by projects, deadline, priority, deadline, labels. 

Generate a readme for this project, also detailing the project set up for new users and where to get the api key for the .env file
#NEXT AUTH CREDENTIALS
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
HASH_SALT=

#GEMINI API CREDENTIALS
GEMINI_API_KEY=

#MONOGO DB CREDENTIALS
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.sxwgxwg.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority&appName=Cluster0

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

the project also contains a .env.example-->

# ProFlow - Project Management Tool

ProFlow is a dynamic and modern project management tool built using **Next.js** and **TypeScript**. It empowers users to create, manage, and track projects and tasks seamlessly. Users can sign in using Google OAuth, create multiple projects, assign team members, and manage tasks with features such as descriptions, priorities, and labels. Additionally, ProFlow integrates with **Google Gemini AI**, assisting users by automatically generating tasks based on the project title and description. Tasks can be viewed in both **List View** and **Kanban View**, where users can drag and drop tasks to organize them efficiently.

## Features

- **Google OAuth** authentication.
- Create multiple projects and add team members.
- Assign tasks with a title, description, priority, and labels.
- **Google Gemini AI integration** to auto-generate tasks based on the project details.
- Tasks can be organized into categories such as **To Do**, **In Progress**, **In Review**, and **Done**.
- View tasks in **List View** and **Kanban View** with **drag-and-drop** functionality.
- Group tasks by **projects**, **priority**, **deadline**, and **labels**.
- Seamless UI with real-time updates.

## Getting Started

### Prerequisites

Before setting up ProFlow, make sure you have the following:

- Node.js (version 14 or above)
- npm or yarn
- MongoDB Atlas (or any MongoDB instance)
- Google OAuth credentials
- Google Gemini API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adidevs/proflow.git
   cd proflow
   ```

2. **Install dependencies:**

   If you're using npm:

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   ProFlow requires some environment variables to function properly. These variables include credentials for Google OAuth, MongoDB, and Google Gemini AI.

   - Duplicate the `.env.example` file and rename it to `.env.local`:

     ```bash
     cp .env.example .env.local
     ```

   - Open `.env.local` and fill in the required values as follows:

   ```bash
   # NEXT AUTH CREDENTIALS
   AUTH_SECRET=your_auth_secret
   AUTH_GOOGLE_ID=your_google_oauth_client_id
   AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
   HASH_SALT=your_hash_salt_value

   # GEMINI API CREDENTIALS
   GEMINI_API_KEY=your_gemini_api_key

   # MONOGO DB CREDENTIALS
   MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.sxwgxwg.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority&appName=Cluster0

   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   ```

   - **Google OAuth Credentials:** You can get your Google OAuth credentials from the [Google Developer Console](https://console.developers.google.com/). Create a new project, enable the "OAuth 2.0" API, and get the Client ID and Secret.
   - **Gemini API Key:** You can get your Google Gemini API Key by signing up at the [Google Cloud Console](https://aistudio.google.com/app/apikey).
   - **MongoDB URI:** Replace `<USERNAME>`, `<PASSWORD>`, and `<DATABASE_NAME>` in the `MONGODB_URI` with your MongoDB Atlas credentials.

4. **Run the development server:**

   Once everything is set up, run the application in development mode.

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the app for production, use the following command:

```bash
npm run build
```

Once built, you can start the production server with:

```bash
npm run start
```

### Deployment

For deployment, make sure to properly configure the `.env` variables on your hosting provider (Vercel, Netlify, etc.), especially for **Google OAuth**, **Gemini API**, and **MongoDB** credentials.

## Usage

### Authentication

ProFlow uses **NextAuth.js** for authentication. Users can sign in using their Google accounts, with credentials managed by NextAuth.

### Project Management

- Users can create new projects, add descriptions, and invite team members.
- Tasks can be assigned to team members, with priority levels and labels like **To Do**, **In Progress**, **In Review**, and **Done**.
- AI-assisted project creation with **Google Gemini** generates tasks based on the project details.

### Task Management

- Tasks can be viewed in **List View** or **Kanban View**.
- **Drag-and-drop** functionality in the Kanban View allows seamless task management.
- Tasks can be grouped by project, deadline, priority, or label for better organization.

## Tech Stack

- **Next.js** - Server-side rendering and static site generation
- **TypeScript** - For type safety and better developer experience
- **MongoDB** - For data storage
- **NextAuth.js** - For authentication with Google OAuth
- **Google Gemini AI** - For task generation
- **React Beautiful DnD** - For drag-and-drop functionality in the Kanban view

## Contributing

We welcome contributions! If you'd like to contribute, feel free to fork the repository and submit a pull request. Make sure to follow the project's code of conduct and contribute with clean, maintainable code.

## License

This project is licensed under the MIT License.

---

With ProFlow, managing your projects has never been easier. Streamline your team's workflow with intuitive task management and AI assistance to stay on top of your projects!

---

Feel free to reach out for support or questions regarding the project setup!