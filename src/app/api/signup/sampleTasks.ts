export const sampleTasks = (projectId: string) => {
   return [
        {
          title: "Setup Profile",
          description: "Fill out your profile details including name, email, and role.",
          label: "To Do",
          deadline: new Date(),
          isCompleted: false,
          priority: "P1",
          assignedTo: { name: "John Doe", email: "john@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Upload Avatar",
          description: "Upload a profile picture for better team visibility.",
          label: "In Progress",
          deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
          isCompleted: false,
          priority: "P2",
          assignedTo: { name: "Jane Smith", email: "jane@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Invite Team Members",
          description: "Invite team members to collaborate on your projects.",
          label: "In Review",
          deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
          isCompleted: false,
          priority: "P3",
          assignedTo: { name: "Alice Johnson", email: "alice@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Create First Project",
          description: "Create your first project and define goals and objectives.",
          label: "Completed",
          deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
          isCompleted: true,
          priority: "P4",
          assignedTo: { name: "Bob Lee", email: "bob@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Set Project Deadline",
          description: "Set a realistic deadline for the newly created project.",
          label: "To Do",
          deadline: new Date(new Date().setDate(new Date().getDate() + 4)),
          isCompleted: false,
          priority: "P2",
          assignedTo: { name: "Charlie Williams", email: "charlie@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Define Task Categories",
          description: "Create task categories for better project management.",
          label: "In Progress",
          deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
          isCompleted: false,
          priority: "P3",
          assignedTo: { name: "Dave Brown", email: "dave@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Assign Tasks to Team",
          description: "Assign relevant tasks to each team member.",
          label: "To Do",
          deadline: new Date(new Date().setDate(new Date().getDate() + 6)),
          isCompleted: false,
          priority: "P1",
          assignedTo: { name: "Eve Davis", email: "eve@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Setup Project Milestones",
          description: "Define project milestones for tracking progress.",
          label: "In Progress",
          deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
          isCompleted: false,
          priority: "P4",
          assignedTo: { name: "Frank Harris", email: "frank@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Schedule Project Meeting",
          description: "Schedule a meeting with all team members for kickoff.",
          label: "In Review",
          deadline: new Date(new Date().setDate(new Date().getDate() + 8)),
          isCompleted: false,
          priority: "P3",
          assignedTo: { name: "Grace Martin", email: "grace@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Review Task Assignments",
          description: "Review the assigned tasks and make necessary adjustments.",
          label: "Completed",
          deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
          isCompleted: true,
          priority: "P1",
          assignedTo: { name: "Hank Thompson", email: "hank@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Check Project Status",
          description: "Check the current status of the project and overall progress.",
          label: "To Do",
          deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
          isCompleted: false,
          priority: "P2",
          assignedTo: { name: "Ivy Adams", email: "ivy@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Send Progress Report",
          description: "Send the first progress report to the stakeholders.",
          label: "In Progress",
          deadline: new Date(new Date().setDate(new Date().getDate() + 11)),
          isCompleted: false,
          priority: "P1",
          assignedTo: { name: "Jake Anderson", email: "jake@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Submit Feedback",
          description: "Submit feedback on team member performance for review.",
          label: "In Review",
          deadline: new Date(new Date().setDate(new Date().getDate() + 12)),
          isCompleted: false,
          priority: "P4",
          assignedTo: { name: "Kelly Turner", email: "kelly@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Resolve Pending Issues",
          description: "Resolve any pending issues related to the project tasks.",
          label: "To Do",
          deadline: new Date(new Date().setDate(new Date().getDate() + 13)),
          isCompleted: false,
          priority: "P3",
          assignedTo: { name: "Liam Scott", email: "liam@proflow.com" },
          projectId: projectId,
        },
        {
          title: "Finalize Project",
          description: "Complete and finalize all project tasks.",
          label: "Completed",
          deadline: new Date(new Date().setDate(new Date().getDate() + 14)),
          isCompleted: true,
          priority: "P2",
          assignedTo: { name: "Mia Clark", email: "mia@proflow.com" },
          projectId: projectId,
        },
      ]
} 