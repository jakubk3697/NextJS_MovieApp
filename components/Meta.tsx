import Head from 'next/head';

type DefaultProps = {
    title: string;
    keywords: string;
    description: string;
}

/**
 * 
 * @param title
 * @param keywords
 * @param description
 * @description When we provide the title, keywords and description props, it will be used to render the meta component. 
 * @description If we don't provide the title, keywords and description props, it will use the default props.
 * @returns The meta component with the title, keywords and description.
 */
export const Meta = ({ keywords, title, description }: DefaultProps) =>{
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <link rel="icon" href="/images/camera.png" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Movie App',
    keywords: 'movies, movie app',
    description: 'Find the latest movies'
}