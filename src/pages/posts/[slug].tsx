import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import SEO from "../../components/SEO";
import styles from "../../styles/posts.module.scss";


export default function Post() {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <SEO title="POSTS" />
            <main className={styles.container}>
                <div className={styles.posts}>
                    <h1>Titulo</h1>
                    <time>Data</time>
                    <div>Conteudo</div>
                </div>
            </main>




        </>
    );

}

// export const getStaticProps: GetStaticProps<CommentsProps> = async (context) => {

//     const { id } = context.params;
//     const response = await api.get(`/comments?postId=${id}`);
//     const comments = response.data;
//     return {
//         props: {
//             comments,
//         }, // will be passed to the page component as props
//     }
// }

