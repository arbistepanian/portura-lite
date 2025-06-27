import { MongoClient, Db, ServerApiVersion } from "mongodb";

let client: MongoClient;
let porturaLiteDb: Db;

let connectPromise: Promise<void> | null = null;

async function connectToDb(): Promise<void> {
    if (porturaLiteDb) return;

    const uri = process.env.MONGODB_URI!;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!connectPromise) {
        connectPromise = (async () => {
            client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: false,
                    deprecationErrors: true,
                },
            });

            await client.connect();

            porturaLiteDb = client.db(dbName);

            if (!porturaLiteDb) {
                throw new Error("Failed to initialize porturaLiteDb");
            }
        })();
    }

    await connectPromise;
}

export async function getDb(): Promise<Db> {
    if (!porturaLiteDb) {
        await connectToDb();
    }

    if (!porturaLiteDb) {
        throw new Error(
            "Portura Lite database is not initialized after connection"
        );
    }

    return porturaLiteDb;
}
