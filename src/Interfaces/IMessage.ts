import { ITwitterProfile } from "./ICommons";
import { IMedia } from "./IMedia";


    export interface ISender {
        id: number;
        first_name: string;
        last_name: string;
        phone: string;
        twitter_profile: ITwitterProfile;
    }

    export interface IQueuedBy {
        id: number;
        first_name: string;
        last_name: string;
        phone: string;
        twitter_profile: ITwitterProfile;
    }

    export interface ISendDuration {
        years: number;
        months: number;
        weeks: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }

    export interface IPlatform {
        id: number;
        name: string;
    }

    export interface IMessageStatus {
        sent: number;
        error: number;
        pending: number;
        total: number;
    }

    export interface IRecipientCount {
        status: IMessageStatus;
        group_count: number;
        group_list: string[];
        individual_count: number;
        list: any[];
    }

    export interface IMessage {
        id: string;
        sender: ISender;
        body: string;
        queued_by: IQueuedBy;
        send_as_coach?: any;
        created_at: Date;
        updated_at: Date;
        expires_at?: any;
        expired: boolean;
        send_when_most_active: boolean;
        first_sent_at: Date;
        last_sent_at: Date;
        next_send_at: Date;
        send_at: Date;
        send_duration: ISendDuration;
        send_duration_readable: string;
        status: string;
        platform: IPlatform;
        has_media_placeholder: boolean;
        media_placeholder?: any;
        recipient_count: IRecipientCount;
        url: string;
        media_placeholder_preview?: any;
        media: IMedia;
    }
