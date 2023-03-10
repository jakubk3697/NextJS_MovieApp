import Head from 'next/head';

type DefaultProps = {
    title: string;
    keywords: string;
    description: string;
}

export const Meta = ({ keywords, title, description }: DefaultProps) =>{
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <link rel="icon" href="/camera.png" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Movie App',
    keywords: 'movies, movie app',
    description: 'Find the latest movies'
}