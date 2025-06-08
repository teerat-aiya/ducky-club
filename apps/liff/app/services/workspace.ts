import { Workspace } from "~/types/app";
import n8n from "./n8n";

export const fetchWorkspaces = () =>
    n8n.get<Array<Workspace>>(`/workspace`);