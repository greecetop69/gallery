import { notFound } from 'next/navigation';
import { getRequestConfig, unstable_setRequestLocale } from 'next-intl/server';

const locales = ['en', 'ru'];

export default getRequestConfig(async ({ req, locale }: { req: any, locale: string }) => {
    unstable_setRequestLocale(req, locale);

    if (!locales.includes(locale)) {
        notFound();
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
