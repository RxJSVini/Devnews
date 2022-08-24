import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { api } from "../../services/api";


interface Comment {
    id: string;
    body: string;
}

interface CommentsProps {
    comments: Comment[];
}

export default function Post({ comments }: CommentsProps) {

    const router = useRouter();

    if(router.isFallback){
        return <p>Loading ...</p>
    }

    return (
        <div>
            <h1>Listagem de Posts</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
        </div>
    );

}


export const getStaticPaths = async () => {

    const response = await api.get(`/posts`);
    const posts = response.data;
    const paths = posts.map(post => {
        return {
            params: {
                postId: String(post.id)
            }
        }
    })

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}


export const getStaticProps: GetStaticProps<CommentsProps> = async (context) => {

    const { id } = context.params;
    const response = await api.get(`/comments?postId=${id}`);
    const comments = response.data;
    return {
        props: {
            comments,
        }, // will be passed to the page component as props
    }
}