import { Connection } from 'mongoose';

declare global {
    var mongooseFromGlobal : {
        conn: Connection | null;
        promise : Promise<Connection> | null;
    }
}

export {};