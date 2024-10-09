declare global{
    interface User{
        id: string;
        name: string;
        email: string;
        password: string;
        image?: string,
        isVerified: boolean,
        verficationToken: string,
    }

    interface Task{
        _id: string;
        title: string;
        description?: string;
        isCompleted: boolean;
        priority: "P1" | "P2" | "P3" | "P4";
        label?: string;
        deadline?: Date;
        projectId: Project._id;
        assignedTo: {
            name: string;
            email: string;
        };
    }
    
    interface Project{
        _id: string;
        name: string;
        description?: string;
        owner: string;
        labels: string[];
        members: {
            name: string,
            email: string
        }[];
    }
    interface Projects{
        projects: Project[];
    }

}

export {};