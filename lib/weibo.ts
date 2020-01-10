import Axios, { AxiosResponse } from 'axios';
import { stringify } from "querystring";
import { IAuthorize, IGetToken, IToken, ILoginOut } from './weibo.interface';

const server = Axios.create({
    baseURL: "https://api.weibo.com",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

server.interceptors.response.use((res: AxiosResponse<any>) => res, (err: any) => {
    return null;
})


export default class WeiboOauth {
    constructor(
        private readonly id: string,
        private readonly key: string,
    ) { }

    public authorize(params: IAuthorize) {
        return `https://api.weibo.com/oauth2/authorize?client_id=${this.id}&redirect_uri=${params.url}&state=${params.state}&forcelogin=${!!params.forcelogin}${params.scope ? `scope=${params.scope}` : ''}`;
    }

    public async token(code: string, url: string) {
        return await server.post('/oauth2/access_token', stringify({
            client_id: this.id,
            client_secret: this.key,
            grant_type: "authorization_code",
            code,
            redirect_uri: url
        }))
    }

    public async getToken(token: string) {
        return await server.post('/oauth2/get_token_info', stringify({
            access_token: token
        }))
    }

    public async loginout(token: string) {
        return await server.post('/oauth2/revokeoauth2', stringify({
            access_token: token
        }))
    }
}