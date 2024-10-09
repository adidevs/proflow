import { create } from "zustand";

type Projects = {
  projects: Project[];
  getProject: (id: string | undefined) => Project | undefined;
  getProjects: () => Project[];
  setProjects: (projects: Project[]) => void;
  setProject: (project: Project) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (project: Project) => void;
  addMember: (
    project_id: string,
    member_name: string,
    member_email: string
  ) => void;
  removeMember: (project_id: string, member_email: string) => void;
  addLabel: (project_id: string, label: string) => void;
  removeLabel: (project_id: string, label: string) => void;
};

export const useProjects = create<Projects>((set, get) => ({
  projects: [],
  getProject: (id) => {
    if (!id) return undefined;
    return get().projects.find((p) => p._id === id);
  },
  getProjects: () => get().projects,
  setProjects: (projects) => set({ projects }),
  setProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === project._id ? project : p
      ),
    })),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p._id !== id) })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === project._id ? project : p
      ),
    })),
  addMember: (project_id, member_name, member_email) =>
    set((state) => {
      const projects = state.projects.map((p) => {
        if (p._id === project_id) {
          p.members.push({ name: member_name, email: member_email });
        }
        return p;
      });
      return { projects };
    }),
  removeMember: (project_id, member_email) =>
    set((state) => {
      const projects = state.projects.map((p) => {
        if (p._id === project_id) {
          p.members = p.members.filter((m) => m.email !== member_email);
        }
        return p;
      });
      return { projects };
    }),
  addLabel: (project_id, label) =>
    set((state) => {
      const projects = state.projects.map((p) => {
        if (p._id === project_id) {
          p.labels.push(label);
        }
        return p;
      });
      return { projects };
    }),
  removeLabel: (project_id, label) =>
    set((state) => {
      const projects = state.projects.map((p) => {
        if (p._id === project_id) {
          p.labels = p.labels.filter((l) => l !== label);
        }
        return p;
      });
      return { projects };
    }),
}));

type TaskStore = {
  tasks: Task[];
  setTasksList: (tasks: Task[]) => void;
  getTask: (id: string | undefined) => Task | undefined;
  addTask: (task: Task) => void;
  removeTask: (id: string | undefined) => void;
  updateTask: (task: Task) => void;
};

export const useTasks = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasksList: (tasks) => set({ tasks }),
  getTask: (id) => get().tasks.find((t) => t._id === id),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
    })),
}));
