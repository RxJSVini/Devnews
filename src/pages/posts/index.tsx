import { GetStaticProps } from "next";
import SEO from "../../components/SEO";
import styles from "../../styles/posts.module.scss";
import Link from "next/link";
import React from "react";

// const Modal = dynamic(
//   () => import('../../components/Modal').then((mod) => mod.Modal), {
//   loading: () => <p>Loading ...</p>,
//   ssr: false
// }
// )

interface Post {
  id: string;
  title: string;
}
interface PostsProps {
  posts: Post[];
}

export default function Post() {
  return (
    <>
      <SEO title="POSTS"/>
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href="#">
            <a>
              <time>25 de dezembro de 2022</time>
              <strong>Titulo</strong>
              <p>Paragrafo</p>
            </a>

          </Link>
          <ul>
          </ul>
        </div>
      </main>


    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await api.get("/posts")
//   const posts = response.data;
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 5,
//   }
// }