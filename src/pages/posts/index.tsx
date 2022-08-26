import { GetStaticProps } from "next";
import SEO from "../../components/SEO";
import styles from "./posts.module.scss";
import Link from "next/link";
import React from "react";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  slugid?:string;
}
interface PostsProps {
  posts: Post[];
}

export default function Post({ posts }: PostsProps) {
  return (
    <>
      <SEO title="POSTS" />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{`${post.updatedAt}`}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>

            </Link>
          ))}
        </div>
      </main>


    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content']
    });

  const posts = response.results.map(post => {
    return {

      slug: post.id,
      slugid:post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day:'2-digit',
          month:'long',
          year:'numeric'
        }
      ),
    }
  })

  console.log(response)

  return {
    props: {
      posts,
    },
    revalidate: 2,
  }
}