export interface IAuthorize {
    url: string;
    state: string;
    forcelogin?: boolean;
    scope?: "all" | "email" | "direct_messages_write" | "direct_messages_read" | "invitation_write" | "friendships_groups_read" | "friendships_groups_write" | "statuses_to_me_read" | "follow_app_official_microblog";
}

export interface IToken {
    access_token: string;
    expires_in: string;
    remind_in?: string;
    uid: string;
}
export interface IGetToken {
    uid: string;
    appkey: string;
    scope: string;
    create_at: string;
    expire_in: string;
}

export interface ILoginOut {
    result: string;
}