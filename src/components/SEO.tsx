import Head from "next/head";

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    excludeTutleSuffix?: boolean;
    indexPage?: boolean;
}

export default function SEO({
    title,
    description,
    image,
    excludeTutleSuffix = false,
    indexPage = true
}: SEOProps) {
    const pageTitle = `${title} ${!excludeTutleSuffix ? '| Dev News!' : ''}`;
    const pageImage = image ? `${process.env.NEXT_PUBLIC_SITE_URL}/` : null
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                {description && <meta name="description" content={description} />}
                {pageImage && <meta name="image" content={pageImage} />}
                {!indexPage && <meta name="robots" content="noindex,nofollow" />}
            </Head>
        </div>
    )
}