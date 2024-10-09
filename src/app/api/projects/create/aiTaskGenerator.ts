import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "API KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a assistant for a project management application. You will generate 15 tasks for the user based on their input of project name and description, dateISOString, you will also get the projectId, which you shall insert at the proper place. Return json array of the task objects for the project, here is a sample task\n  {\n    title: \"Setup Profile\",\n    description: \"Fill out your profile details including name, email, and role.\",\n    label: \"To Do\", //Possible Values = [\"To Do\", \"In Progress\", \"In Review\" ,\"Done\"]\n    deadline: //You will get today's ISODateString from the user, use it and add coming days to it as well e.g: \"2024-10-08T18:30:00.000Z\"..for further tasks, advance the days like \"2024-10-09T18:30:00.000Z\" etc\n    isCompleted: false,\n    priority:  //Possible Values = \"P1\" | \"P2\" | \"P3\" | \"P4\"\n   assignedTo: {name:\"Unassigned\", email: \"null\"}\n    projectId: //projectId received from user, eg: \"f4rtv43rt43....34435\"\n  },\n\nthe output you shall provide will be directly inserted into a mongodb document\n\nsample output: [{\"title\": \"Setup Project Structure\", \"description\": \"Create the basic project directory structure, including components, pages, and API routes.\", \"label\": \"To Do\", \"deadline\": new Date(), \"isCompleted\": false, \"priority\": \"P1\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"f4rtv43rt43....34435\"}]",
  });

const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function generateTasks(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
          role: "user",
          parts: [
            {text: "name:ProFlow;description:A Project Management tool built using next.js typescript;isoDateString:\"2024-10-07T18:30:00.000Z\";projectId:\"66e6c04126450abdccb49947\""},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[{\"title\": \"Setup Project Structure\", \"description\": \"Create the basic project directory structure, including components, pages, and API routes.\", \"label\": \"To Do\", \"deadline\": \"2024-10-07T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P1\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Install Dependencies\", \"description\": \"Install all necessary dependencies using npm or yarn.\", \"label\": \"To Do\", \"deadline\": \"2024-10-08T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P1\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Configure Next.js\", \"description\": \"Set up Next.js configuration, including routing, environment variables, and API routes.\", \"label\": \"To Do\", \"deadline\": \"2024-10-09T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P1\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Create Authentication System\", \"description\": \"Implement user authentication using a suitable method (e.g., JWT, Firebase).\", \"label\": \"To Do\", \"deadline\": \"2024-10-10T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P2\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Develop Project Dashboard\", \"description\": \"Create the main dashboard component for viewing projects, tasks, and progress.\", \"label\": \"To Do\", \"deadline\": \"2024-10-11T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P2\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Implement Project Management Features\", \"description\": \"Add core project management functionalities like task creation, task assignment, deadlines, and progress tracking.\", \"label\": \"To Do\", \"deadline\": \"2024-10-12T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P2\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Develop Task Management UI\", \"description\": \"Create the user interface for managing tasks, including views for list, details, and editing.\", \"label\": \"To Do\", \"deadline\": \"2024-10-13T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P2\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Integrate Data Storage\", \"description\": \"Connect to a database (e.g., MongoDB) and implement data models for projects, tasks, and users.\", \"label\": \"To Do\", \"deadline\": \"2024-10-14T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P2\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Implement API Endpoints\", \"description\": \"Create API endpoints for managing projects, tasks, and user data using Next.js API routes.\", \"label\": \"To Do\", \"deadline\": \"2024-10-15T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P3\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Implement User Profile Management\", \"description\": \"Add functionality for users to manage their profiles, including viewing and editing information.\", \"label\": \"To Do\", \"deadline\": \"2024-10-16T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P3\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Develop Team Collaboration Features\", \"description\": \"Implement features for teams to collaborate on projects, such as sharing tasks and commenting on projects.\", \"label\": \"To Do\", \"deadline\": \"2024-10-17T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P3\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Implement Real-time Updates\", \"description\": \"Use WebSockets or similar technologies to provide real-time updates on project status and task changes.\", \"label\": \"To Do\", \"deadline\": \"2024-10-18T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P4\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Add Reporting and Analytics\", \"description\": \"Implement features for generating reports on project progress, task completion, and other metrics.\", \"label\": \"To Do\", \"deadline\": \"2024-10-19T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P4\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Design User Interface (UI)\", \"description\": \"Create a user-friendly and visually appealing UI design for all components of the application.\", \"label\": \"To Do\", \"deadline\": \"2024-10-20T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P4\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}, {\"title\": \"Testing and Deployment\", \"description\": \"Thoroughly test the application and deploy it to a suitable hosting environment (e.g., Vercel, AWS).\", \"label\": \"To Do\", \"deadline\": \"2024-10-21T18:30:00.000Z\", \"isCompleted\": false, \"priority\": \"P4\", \"assignedTo\": {\"name\": \"Unassigned\", \"email\": \"null\"}, \"projectId\": \"66e6c04126450abdccb49947\"}]\n\n```"},
          ],
        },
      ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default generateTasks;
