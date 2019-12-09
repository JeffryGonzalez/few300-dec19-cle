export interface DashboardModel {
  holidayId: string;
  holidayName: string;
  recipients: {
    id: string;
    name: string;
  }[];
}
