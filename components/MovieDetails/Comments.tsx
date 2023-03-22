import { CommentProps } from "@/types";
import { CommentModal } from "../elements/CommentModal";
import { useState } from "react";
import { CommentsProps } from "@/types";
import { useRouter } from "next/router";


/**
 * 
 * @returns {JSX.Element} - returns a section with movie comments
 * @description It generates a section with movie comments from users of the app 
 * @todo - add functionality to add comments
 * @todo - add functionality to edit comments
 * @todo - add functionality to delete comments
 */
export const Comments = ({comments}: CommentsProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { id } = useRouter().query;

    async function addCommentHandler(enteredCommentData: any) {
        const response = await fetch(`/api/post/comment/${id}`, {
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

    return (
        <section className="relative py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Comments</h2>
            <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
                {comments.map((comment:CommentProps) => {
                    return (
                        <Comment
                            key={comment.id}
                            id={comment.id}
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
            <CommentModal
                isOpen={isModalOpen}
                onClose={toggleModalView}
                onAddComment={addCommentHandler}
            />
        </section>
    );
};

const Comment = ({id, author, title, content }: CommentProps) => (
    <div key={id} id={id} className="w-full mb-4 mx-1 md:w-1/2 md:mb-0">
        <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-red-600 text-lg font-semibold">{title}</p>
            <p className="text-gray-500">
                {content}
            </p>
            <p className="mt-4 border-t-2 text-gray-400 italic">{author}</p>
        </div>
    </div>
);