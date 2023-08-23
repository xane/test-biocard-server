const {env} = process;

export const host = 'localhost';
export const port = env.JS_PORT || 4000;
export const dburl = env.MONGODB_URL || '';
export const url = `http://${host}:${port}`;
