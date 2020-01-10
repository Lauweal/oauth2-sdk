interface IAuthorize {
    url: string;
    state: string;
}

export default class QQOauth {
    constructor(
        private readonly id: string,
        private readonly key: string,
    ) { }

    public authorize(params: IAuthorize) {
        return `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${this.id}&redirect_uri=${params.url}&state=${params.state}`;
    }
}