
export interface IAuthorize {
    url: string;
    state: string;
    forcelogin?: boolean;
    scope?: "all" | "email" | "direct_messages_write" | "direct_messages_read" | "invitation_write" | "friendships_groups_read" | "friendships_groups_write" | "statuses_to_me_read" | "follow_app_official_microblog";
}


export default class WeiboOauth {
    constructor(
        private readonly id: string,
        private readonly key: string,
    ) { }

    public authorize(params: IAuthorize) {
        return `https://api.weibo.com/oauth2/authorize?client_id=${this.id}&redirect_uri=${params.url}&state=${params.state}&forcelogin=${!!params.forcelogin}${params.scope ? `scope=${params.scope}` : ''}`;
    }
}