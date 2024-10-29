
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Notify } from '../../models/workPlan/Notify';

class SignalRService {
  private hubConnection: HubConnection | null = null;

  startConnection = (userId: string) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7166/signalServer`, {
        accessTokenFactory: () => userId,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((err) => console.error('SignalR Connection Error: ', err));
  };

  onReceiveNotifications = (callback: (notifications: Notify[]) => void) => {
    if (this.hubConnection) {
      this.hubConnection.on('displayNotifications', callback);
    }
  };

  stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  };
}

const signalRService = new SignalRService();
export default signalRService;
