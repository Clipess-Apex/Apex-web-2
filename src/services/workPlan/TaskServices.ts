import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBaseUrl = getHost() + "task/";

export async function getTasks() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetTasks")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getEmployeeTasks() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetEmployeeTasks")

            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getTask(taskId: string) {
    return new Promise((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetTask?taskId=" + taskId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export async function postTask(taskData: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "PostTask", taskData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
                toast.error(error);
            });
    });
}

export async function deleteTask(taskId: string) {
    return new Promise((resolve, reject) => {
        axios
            .delete(apiBaseUrl + "DeleteTask?taskId=" + taskId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function editTask(taskId: number, updatedTaskData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "PutTask?TaskId=" + taskId, updatedTaskData)
            .then((response) => {
                resolve(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function assignTask(taskId: number, updatedTaskData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "AssignTask?TaskId=" + taskId, updatedTaskData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function updateTaskStatus(taskId: number, updatedTaskData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "UpdateTaskStatus?TaskId=" + taskId,updatedTaskData)
            .then((response) => {
                resolve(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
