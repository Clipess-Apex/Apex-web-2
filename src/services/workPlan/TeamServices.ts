import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Team } from "../../models/workPlan/Team";

const apiBaseUrl = getHost() + "team/";

export async function getTeams() {
    return new Promise<any>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetTeams")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export async function getTeam(teamId: number) {
    return new Promise<Team>((resolve, reject) => {
        axios
            .get(apiBaseUrl + "GetTeam?teamId=" + teamId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function deleteTeam(teamId: string) {
    return new Promise((resolve, reject) => {
        axios
            .delete(apiBaseUrl + "DeleteTeam?teamId=" + teamId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function postTeam(teamData: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(apiBaseUrl + "PostTeam", teamData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
                toast.error(error);
            });
    });
}

export async function editTeam(teamId: number, updatedTeamData: any) {
    return new Promise((resolve, reject) => {
        axios
            .put(apiBaseUrl + "PutTeam?teamId=" + teamId, updatedTeamData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
