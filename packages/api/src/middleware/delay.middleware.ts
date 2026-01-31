import { NextFunction, Request, Response } from 'express';

export const delayMiddleware = (ms: number) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        console.log(`[Delay] ${req.method} ${req.url} - Waiting ${ms}ms...`);
        setTimeout(next, ms);
    };
};
