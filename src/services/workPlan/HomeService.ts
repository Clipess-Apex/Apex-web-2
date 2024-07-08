import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";

const apiBaseUrl = getHost() + "home/";

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
