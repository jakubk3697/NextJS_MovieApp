import { CommentProps } from "@/types";
import { CommentForm } from "../elements/CommentForm";
import { useState, useEffect } from "react";
import { CommentsProps } from "@/types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Loader } from "../elements/Loader";

/**
 * @description It generates comments fetched from the database and passes them to the Comment component
 * @description each movie ID has its own collection in the database
 * @returns returns a section with movie comments taken from database
 * @todo - add functionality to edit comments for for own comments
 * @todo - add functionality to delete comments for for own comments
 */
export const Comments = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const initFetchComments = async () => {
        const response = await fetch(`/api/get/comments/${id}`);
        const data = await response.json();
        console.log(data);
        
        return data;
    }

    const { data: comments, isFetching: commentsIsFetching } = useQuery<CommentsProps>(['comments', id], () => initFetchComments(), {
        enabled: !!id && router.isReady,
    });

    /**
     * @param enteredCommentData Contains the data from the CommentForm form
     * @description It sends a POST request to the API endpoint with the data from the CommentForm form component
     * @description It then takes the response and converts it to JSON
     */
    async function addCommentHandler(enteredCommentData: any) {
        const response = await fetch(`/api/post/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify(enteredCommentData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
    }

    const toggleModalView = () => {
        setIsModalOpen(!isModalOpen);
    }

    if(!comments || commentsIsFetching) {
        return <Loader/>
    }

    return (
        <section className="relative py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Comments</h2>
            <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
                {comments.map((comment:CommentProps) => {
                    return (
                        <Comment
                            _id={comment._id} 
                            key={comment._id}
                            author={comment.author}
                            title={comment.title}
                            content={comment.content} 
                        />
                    )
                })}
            </div>
            <button
                type="button"
                className={`${isModalOpen ? "hidden" : "block"}
                absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                onClick={toggleModalView}
            >
                Add a comment
            </button>
            <CommentForm
                isOpen={isModalOpen}
                onClose={toggleModalView}
                onAddComment={addCommentHandler}
            />
        </section>
    );
};

const Comment = ({_id, author, title, content }: CommentProps) => (
    <div key={_id} id={_id} className="w-full mb-4 mx-1 md:w-1/2 md:mb-0">
        <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-red-600 text-lg font-semibold">{title}</p>
            <p className="text-gray-500">
                {content}
            </p>
            <p className="mt-4 border-t-2 text-gray-400 italic">{author}</p>
        </div>
    </div>
);