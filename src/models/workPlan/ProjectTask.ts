export interface ProjectTask {
    taskId: number;
    taskName: string;
    teamId: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
    createdDate: Date;
    updatedDate: Date;
    assigned: boolean;
    assignedDate: Date;
    deletedDate: Date;
    deleted: boolean;
    taskStatusId:number;
    delete:string;
}