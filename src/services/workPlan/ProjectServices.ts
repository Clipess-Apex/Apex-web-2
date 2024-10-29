import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBaseUrl = getHost() + "project/";

export async function getProjects() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetProjects")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getProject(projectId: string) {
    return new Promise((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetProject/" + projectId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export async function postProject(projectData: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "PostProject", projectData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
                toast.error(error);
            });
    });
}

export async function deleteProject(projectId: string) {
    return new Promise((resolve, reject) => {
        axios
            .delete(apiBaseUrl + "DeleteProject?projectId=" + projectId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export async function editProject(projectId: string, updatedProjectData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "PutProject?projectId=" + projectId, updatedProjectData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function UpdateProjectStatus(projectId: string, updatedProjectData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "UpdateProjectStatus?projectId=" + projectId,updatedProjectData)
            .then((response) => {
                resolve(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
