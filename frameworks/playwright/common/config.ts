import config, { env_password, env_username, env } from '../playwright.config';
export const baseUrl: string = config.use?.baseURL ? config.use.baseURL.replace(/\/$/, '') : '';

export const environment = env;
export const username = env_username;
export const password = env_password;