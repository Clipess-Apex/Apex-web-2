import axios from "axios";
import { getHost } from "../../helpers/workPlan/Common";
import { TaskReportRequest } from "../../models/workPlan/TaskReportRequest";

const apiBaseUrl = getHost() + "taskpdfGeneration/";

export async function generateTaskReportPdf(EmployeeId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(apiBaseUrl + "GenerateTaskReportPdf?EmployeeId=" + EmployeeId)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
