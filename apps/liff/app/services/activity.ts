import { Activity } from "~/types/app";
import n8n from "./n8n";

export const fetchActivities = () =>
    n8n.get<Array<Activity>>(`/activities`);

export const insertActivity = (activity: Activity) =>
    n8n.post<Activity>(`/activities`, activity);