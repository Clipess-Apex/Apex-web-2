import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";
import { TaskNotification } from "../../models/workPlan/TaskNotification";

const apiBaseUrl = getHost() + "notification/";

export async function getNotifications(EmployeeId: number) {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetNotifications?EmployeeId="+EmployeeId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function readNotification(EmployeeId: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "ReadNotification?EmployeeId=" + EmployeeId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function createNotification(notificationId: any,EmployeeId:number) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "CreateNotification?notificationId=" + notificationId+"&EmployeeId="+EmployeeId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function createTaskNotification(notificationId: any,EmployeeIds:string) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "CreateTaskNotification?notificationId=" + notificationId+"&EmployeeIds="+EmployeeIds)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
       
        
