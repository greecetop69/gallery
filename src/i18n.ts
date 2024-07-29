import { notFound } from 'next/navigation';
import { getRequestConfig, unstable_setRequestLocale } from 'next-intl/server';

const locales = ['en', 'ru'];

export default getRequestConfig(async ({ req, locale }) => {
    unstable_setRequestLocale(req, locale);

    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
