declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    REDIS_URL: string;
    DATABASE_URL: string;
    PORT: string;
  }
}
