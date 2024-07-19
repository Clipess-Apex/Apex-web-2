

export interface Notification {
    id: number;
    message: string;
    createdAt: string;
}

export interface ListItem {
    name: string;
    path: string;
    icon: JSX.Element;
  }

export  interface LayoutProps {
    children?: React.ReactNode;
  }