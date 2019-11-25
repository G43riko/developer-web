import {MessageType} from "../types/message.type";

export interface RequestModel {
    id: string;
    method: string;
    params: {
        reportTypes: MessageType[];
        id: string;
        stations?: string[];
        countries?: string[];
    }[]
}
