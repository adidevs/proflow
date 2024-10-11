import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "API KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'You are a assistant for a project management application. You will generate 15 tasks for the user based on their input of project name and description, dateISOString, you will also get the projectId, which you shall insert at the proper place. Return json array of the task objects for the project, here is a sample task\n  {\n    title: "Setup Profile",\n    description: "Fill out your profile details including name, email, and role.",\n    label: "To Do", //Possible Values = ["To Do", "In Progress", "In Review" ,"Done"]\n    deadline: //You will get the day\'s ISODateString from the user, use it and add coming days to it as well e.g: "2024-10-11T18:30:00.000Z"..for further tasks, advance the days like "2024-10-09T18:30:00.000Z" etc. Note that the deadline should not be less than the value of dateISOString, it should not show past values, eg: if the date string is "2024-10-11T18:30:00.000Z", the date should not be lower than 2024-10-11..\n    isCompleted: false,\n    priority:  //Possible Values = "P1" | "P2" | "P3" | "P4"\n   assignedTo: {name:"Unassigned", email: "null"}\n    projectId: //projectId received from user, eg: "f4rtv43rt43....34435"\n  },\n\nthe output you shall provide will be directly inserted into a mongodb document\n\nsample output: [{"title": "Setup Project Structure", "description": "Create the basic project directory structure, including components, pages, and API routes.", "label": "To Do", "deadline": new Date(), "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "f4rtv43rt43....34435"}]',
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
          {
            text: 'name:ProFlow;description:A Project Management tool built using next.js typescript;isoDateString:"2024-10-11T18:30:00.000Z";projectId:"66e6c04126450abdccb49947"',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[{"title": "Setup Project Structure", "description": "Create the basic project directory structure, including components, pages, and API routes.", "label": "To Do", "deadline": "2024-10-11T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Install Dependencies", "description": "Install all necessary packages for the project, including Next.js, TypeScript, and any other required libraries.", "label": "To Do", "deadline": "2024-10-12T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Configure TypeScript", "description": "Set up TypeScript configuration files and ensure type safety for the project.", "label": "To Do", "deadline": "2024-10-13T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Create Basic Components", "description": "Design and implement essential components, such as the project list, task card, and navigation bar.", "label": "To Do", "deadline": "2024-10-14T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Implement Project List View", "description": "Develop the UI to display a list of projects, including their details, status, and deadlines.", "label": "To Do", "deadline": "2024-10-15T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Implement Task Management", "description": "Enable users to create, edit, delete, and assign tasks within each project.", "label": "To Do", "deadline": "2024-10-16T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Design User Authentication", "description": "Implement user registration, login, and session management.", "label": "To Do", "deadline": "2024-10-17T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Implement API Routes", "description": "Create server-side routes to handle data persistence and retrieval.", "label": "To Do", "deadline": "2024-10-18T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Develop Data Persistence Layer", "description": "Choose a suitable database (e.g., MongoDB) and set up data models to store project and task information.", "label": "To Do", "deadline": "2024-10-19T18:30:00.000Z", "isCompleted": false, "priority": "P4", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Implement User Profile Management", "description": "Allow users to manage their profiles, including settings, preferences, and password updates.", "label": "To Do", "deadline": "2024-10-20T18:30:00.000Z", "isCompleted": false, "priority": "P4", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Create Basic Project Dashboard", "description": "Develop a dashboard for each project, showing progress, deadlines, and key metrics.", "label": "To Do", "deadline": "2024-10-21T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Integrate Notifications", "description": "Set up notifications for task deadlines, reminders, and other important updates.", "label": "To Do", "deadline": "2024-10-22T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Implement Collaborative Features", "description": "Enable users to collaborate on projects, share tasks, and work together in real-time.", "label": "To Do", "deadline": "2024-10-23T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Design and Implement UI/UX", "description": "Focus on creating a user-friendly and visually appealing interface for the application.", "label": "To Do", "deadline": "2024-10-24T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}, {"title": "Conduct Testing and Debugging", "description": "Thoroughly test the application for bugs and usability issues and address them before deployment.", "label": "To Do", "deadline": "2024-10-25T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126450abdccb49947"}]\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: 'name:QuickCall;description:A  Video Conferencing app;isoDateString:"2024-10-19T18:30:00.000Z";projectId:"66e6c04126410abdccb69968"',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[{"title": "Setup Project Structure", "description": "Create the basic project directory structure, including components, pages, and API routes.", "label": "To Do", "deadline": "2024-10-19T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Install Dependencies", "description": "Install all necessary packages for the project, including React, WebRTC, and any other required libraries.", "label": "To Do", "deadline": "2024-10-20T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Implement Video/Audio Capture", "description": "Develop the functionality to capture video and audio from the user\'s webcam and microphone.", "label": "To Do", "deadline": "2024-10-21T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Integrate WebRTC", "description": "Set up WebRTC connection to establish peer-to-peer communication between users.", "label": "To Do", "deadline": "2024-10-22T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Design Call UI", "description": "Create the interface for joining, managing, and ending calls, including video display, audio controls, and mute functionality.", "label": "To Do", "deadline": "2024-10-23T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Implement Screen Sharing", "description": "Allow users to share their screens during a call.", "label": "To Do", "deadline": "2024-10-24T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Integrate Chat Feature", "description": "Develop a chat feature within the call interface to enable text communication between participants.", "label": "To Do", "deadline": "2024-10-25T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Implement Call Recording", "description": "Add functionality to record call sessions for later playback.", "label": "To Do", "deadline": "2024-10-26T18:30:00.000Z", "isCompleted": false, "priority": "P4", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Design User Authentication", "description": "Implement user registration, login, and session management for the app.", "label": "To Do", "deadline": "2024-10-27T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Develop Call Scheduling System", "description": "Allow users to schedule calls in advance with other participants.", "label": "To Do", "deadline": "2024-10-28T18:30:00.000Z", "isCompleted": false, "priority": "P4", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Create Call Room Management", "description": "Develop the ability to create, join, and leave virtual call rooms.", "label": "To Do", "deadline": "2024-10-29T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Integrate Conference Room Features", "description": "Allow users to create and join conferences with multiple participants.", "label": "To Do", "deadline": "2024-10-30T18:30:00.000Z", "isCompleted": false, "priority": "P3", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Implement Background Noise Suppression", "description": "Add features to suppress background noise during calls.", "label": "To Do", "deadline": "2024-10-31T18:30:00.000Z", "isCompleted": false, "priority": "P4", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Design and Implement UI/UX", "description": "Focus on creating a user-friendly and intuitive interface for the app.", "label": "To Do", "deadline": "2024-11-01T18:30:00.000Z", "isCompleted": false, "priority": "P2", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}, {"title": "Conduct Testing and Debugging", "description": "Thoroughly test the app for bugs, performance, and compatibility issues before deployment.", "label": "To Do", "deadline": "2024-11-02T18:30:00.000Z", "isCompleted": false, "priority": "P1", "assignedTo": {"name": "Unassigned", "email": "null"}, "projectId": "66e6c04126410abdccb69968"}]\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default generateTasks;
