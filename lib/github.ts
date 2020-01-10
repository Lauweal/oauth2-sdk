import Axios, { AxiosResponse } from 'axios';
import { stringify } from "querystring";

const server = Axios.create({
    baseURL: "https://github.com",
    headers: {
        accept: 'application/json'
    }
});

server.interceptors.response.use((res: AxiosResponse<any>) => res, (err: any) => {
    return null;
})

interface IAuthorize {
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

    public async token(code: string, url: string, state: string) {
        return await server.post('/login/oauth/access_token', {
            client_id: this.id,
            client_secret: this.key,
            code,
            redirect_uri: url,
            state
        });
    }

    public async getUser(token: string) {
        return await server.get('/user', {
            baseURL: "https://api.github.com",
            headers: {
                accept: 'application/json',
                Authorization: `token ${token}`
            }
        })
    }
}