import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getHost } from "../../helpers/workPlan/Common";

const apiBaseUrl = getHost() + "client/";

export async function getClients() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "Getclients")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getClient(clientId: string) {
    return new Promise((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetClient/" + clientId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export async function postClient(clientData: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "PostClient", clientData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function deleteClient(clientId: string) {
    return new Promise((resolve, reject) => {
        axios
            .delete(apiBaseUrl + "DeleteClient?clientId=" + clientId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function editClient(clientId: string, updatedClientData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "PutClient?clientId=" + clientId, updatedClientData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}