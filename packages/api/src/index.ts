import { connectToDatabase } from './database';
import { createServer } from './server';

const bootstrap = async () => {
    await connectToDatabase();

    const app = createServer();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

bootstrap().catch(console.error);
