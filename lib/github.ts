export interface IAuthorize {
    url: string;
    state: string;
}

export default class GithubOauth {
    constructor(
        private readonly id: string,
        private readonly key: string,
    ) { }

    public authorize(params: IAuthorize) {
        return `https://github.com/login/oauth/authorize?client_id=${this.id}&state=${params.state}&redirect_uri=${params.url}`;
    }
}