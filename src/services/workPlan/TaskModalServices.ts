import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getHost } from "../../helpers/workPlan/Common";

const apiBaseUrl = getHost() ;

export async function getFormClients() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl+ "client/" + "GetFormClients")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getFormProjects() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl+ "project/" + "GetFormProjects")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getFormTeams() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl+ "team/" + "GetFormTeams")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getFormUsers() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl+ "task/" + "GetFormUsers")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

