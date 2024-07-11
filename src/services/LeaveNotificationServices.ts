import axios from "axios";

export interface NotificationData {
    EmployeeId: number;
    LeaveId: number;
    Message: string;
}

const API_BASE_URL = 'https://localhost:7166/api/LeaveNotification';

export const createNotification = async (notificationData: NotificationData): Promise<any> => {
  try {
      const response = await fetch(`${API_BASE_URL}/create`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationData),
      });

      const textResponse = await response.text(); // Read the raw response as text

      if (response.ok) {
          try {
              const responseData = JSON.parse(textResponse); // Attempt to parse the text response as JSON
              console.log('Notification response data:', responseData);
              return responseData;
          } catch (error) {
              console.error('Error parsing JSON response:', error);
              console.error('Raw response:', textResponse);
              return null;
          }
      } else {
          console.error('Failed to send notification:', textResponse);
          return null;
      }
  } catch (error) {
      console.error('Error sending notification:', error);
      return null;
  }
};



export const getUnreadNotificationsForManager = async (managerId: number) => {
  try {
      const response = await fetch(`${API_BASE_URL}/managerUnread/${managerId}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
  }
};

export const getEmployeeNameById = async (employeeId: number): Promise<string> => {
    try {
        const response = await axios.get<string>(`https://localhost:7166/api/employee/employeeName/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee name:', error);
        throw error;
    }
};