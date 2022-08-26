import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import SEO from "../../components/SEO";
import styles from "./post.module.scss";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
}

export default function Post({ post }: PostProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <SEO title="POST" />
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div dangerouslySetInnerHTML={{ __html:post.content}}/>
                </article>
            </main>

        </>
    );

}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: true,
    };
  };



export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    const prismic = getPrismicClient();
  
    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response?.data.title),
        content: RichText.asHtml(response?.data),
        updatedAt: format(
            new Date(response.last_publication_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: ptBR },
          ),
    };

    // console.log('post', post);
    console.log('response', response.data)
    return {
        props: {
            post,
        },
        revalidate: 2,
    }
}

