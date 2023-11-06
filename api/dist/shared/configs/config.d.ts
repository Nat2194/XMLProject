/// <reference types="convict" />
interface Config {
    db: {
        port: number;
        ip_address: string;
        name: string;
        user: string;
        password: string;
    };
    api: {
        port: number;
        nodeEnv: string;
    };
    admin: {
        mail: string;
        password: string;
        firstname: string;
        lastname: string;
    };
    websiteUrl: string;
    jwt: {
        accessSecret: string;
        accessTokenExpirationTime: number;
        refreshSecret: string;
        refreshTokenExpirationTime: number;
    };
    cookie: {
        secret: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
}
export declare const config: import("convict").Config<Config>;
export {};
