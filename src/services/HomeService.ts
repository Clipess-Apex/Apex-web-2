import axios from "axios";
import { getHost } from "../helpers/Common";

const apiBaseUrl = getHost() + "api/";

export async function getUsers() {
    return new Promise<any>((resolve, reject) => {
        axios
        .get(apiBaseUrl + "sample/user")
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}