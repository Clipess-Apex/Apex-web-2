export interface Project {
    projectId: number;
    projectName: string;
    clientId: number;
    description: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    projectStatusId: number;
    createdDate: Date;
    updatedDate: Date;
    documentURL: string;
    deleted: boolean;
    deletedDate: Date;
    delete:string;
}