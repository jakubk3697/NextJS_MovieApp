import { CommentProps } from "@/types";
import { CommentForm } from "../elements/CommentForm";
import { useState, useEffect } from "react";
import { CommentsProps } from "@/types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Loader } from "../elements/Loader";
import { useSession } from 'next-auth/react';

/**
 * @description It generates comments fetched from the database and passes them to the Comment component
 * @description each movie ID has a document in the comments collection in the database
 * @returns returns a section with movie comments taken from database
 * @todo - add functionality to edit comments for own comments
 * @todo - add functionality to delete comments for own comments
 */
export const Comments = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: session, status } = useSession();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [queryTrigger, setQueryTrigger] = useState<boolean>(true);

    const initFetchComments = async () => {
        const response = await fetch(`/api/get/comments/${id}`);
        const data = await response.json();
        return data;
    }

    /**
     * @description It fetches the comments from the database on page load and when user adds a comment
     * @description querTrigger is set to true when user adds a comment and it is set to false when the query is successful. 
     */
    const { data: comments, isFetching: commentsIsFetching } = useQuery<CommentsProps>(['comments', id], () => initFetchComments(), {
        enabled: !!id && router.isReady && queryTrigger,
        onSuccess: () => setQueryTrigger(false),
    });

    async function addCommentHandler(enteredCommentData: any) {
        await fetch(`/api/post/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify(enteredCommentData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        setQueryTrigger(true);
    }

    const toggleModalView = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAddCommentClick = () => {
        if (status === 'authenticated') {
            toggleModalView();
            
        } else {
            alert('You must be logged in to add a comment');
            router.replace('/auth/signIn');
        }
    }

    return (
        <section className="relative py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Comments</h2>
            {!comments || commentsIsFetching ? (
                <Loader />
            ) : (
                <>
                    {Array.isArray(comments) ? (
                        <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
                            {comments.map((comment: CommentProps) => {
                                return (
                                    <Comment
                                        key={comment.id}
                                        id={comment.id}
                                        author={comment.author}
                                        title={comment.title}
                                        content={comment.content}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p>No comments found.</p>
                    )}

                    <button
                        type="button"
                        className={`${isModalOpen ? "hidden" : "block"}
                absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        onClick={handleAddCommentClick}
                    >
                        Add a comment
                    </button>
                    <CommentForm
                        isOpen={isModalOpen}
                        onClose={toggleModalView}
                        onAddComment={addCommentHandler}
                    />
                </>
            )}
        </section>
    );
};

const Comment = ({ id, author, title, content }: CommentProps) => (
    <div key={id} id={id} className="w-full mb-4 mx-1 md:w-1/2 md:mb-0">
        <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-red-600 text-lg font-semibold">{title}</p>
            <p className="text-gray-500">{content}</p>
            <p className="mt-4 border-t-2 text-gray-400 italic">{author}</p>
        </div>
    </div>
);