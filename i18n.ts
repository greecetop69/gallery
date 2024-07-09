import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define supported locales
const locales: string[] = ['en', 'ru'];

// Define the structure of the messages JSON file
type Messages = Record<string, string>;

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) notFound();

    // Import the messages JSON file with a proper type
    const messages: Messages = await import(`src/messages/${locale}.json`)
        .then((module) => {
            if (module && typeof module === 'object' && 'default' in module) {
                return module.default as Messages;
            }
            throw new Error('Invalid messages file');
        })
        .catch((error) => {
            console.error('Failed to load messages:', error);
            notFound();
        });

    return {
        messages,
    };
});
