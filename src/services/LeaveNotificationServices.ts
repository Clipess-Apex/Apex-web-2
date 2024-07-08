export interface NotificationData {
    EmployeeId: number;
    LeaveId: number;
    Message: string;
    ManagerId: number;
    CreatedAt?: string;
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

    if (response.ok) {
      const responseData = await response.json();
      console.log('Notification response data:', responseData);
      return responseData;
    } else {
      const errorText = await response.text();
      console.error('Failed to send notification:', errorText);
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