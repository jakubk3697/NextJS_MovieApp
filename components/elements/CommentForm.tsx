import { useRef } from 'react';
import { CommentFormProps } from '@/types';
import { commentsFormValidation } from '@/utils/validation';
import { useState } from 'react';

/**
 * @param isOpen is boolean value that determines if the modal is open or not
 * @param onClose is a function that closes/open the modal
 * @param onAddComment is props that is passed from the parent component. It is a function that adds a comment to the database
 * @description Contains a form with data which is passed to the onAddComment function to add comment to the database
 * @todo add form validation to prevent sending unnecessary data to the database
 */
export const CommentForm = ({ isOpen, onClose, onAddComment }: CommentFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const [formInputsValidation, setFormInputsValidation] = useState<{
        title: boolean;
        content: boolean;
        author: boolean;
    }>({ title: false, content: false, author: false });

    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const author = authorRef.current?.value;


    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const titleIsValid = commentsFormValidation.title.test(title!);
        const contentIsValid = commentsFormValidation.content.test(content!);
        const authorIsValid = commentsFormValidation.author.test(author!);

        setFormInputsValidation({
            title: titleIsValid,
            content: contentIsValid,
            author: authorIsValid,
        });

        if(titleIsValid && contentIsValid && authorIsValid) {
            submitHandler();
        }
    };

    const validateInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
    }

    /**
     * @param e is a React.FormEvent<HTMLFormElement> object
     * @description This function is a handler for the form submit event. It takes the data from the form and passes it to the onAddComment function
     */
    const submitHandler = async () => {
        const commentData = {
            title,
            content,
            author,
        };

        onAddComment(commentData);
        onClose();
        titleRef.current!.value = '';
        contentRef.current!.value = '';
        authorRef.current!.value = '';
    }

    return (
        <form
            className={` ${isOpen ? "block" : "hidden"} mx-auto py-5 mt-5 md:w-2/3`}
            onSubmit={validateForm}
        >
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-black">Add a Comment</h2>

                <div className="flex flex-col w-full mb-3">
                    <label
                        htmlFor="title"
                        className="mb-2 text-sm font-bold text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="px-4 py-2 mb-1 text-gray-700 bg-gray-200 border-none rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-white"
                        ref={titleRef}
                    />
                      {formInputsValidation.title === false && (
                            <span className="text-red-500">Title should contain 3-30 characters</span>
                        )}
                </div>

                <div className="flex flex-col w-full mb-3">
                    <label
                        htmlFor="content"
                        className="mb-2 text-sm font-bold text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        className="px-4 py-2 mb-1 text-gray-700 bg-gray-200 border-none rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-white"
                        ref={contentRef}
                    />
                    {formInputsValidation.content === false && (
                        <span className='text-red-500'>Title should contain 20-200 characters.</span>
                    )}
                </div>

                <div className="flex flex-col w-full mb-3">
                    <label
                        htmlFor="title"
                        className="mb-2 text-sm font-bold text-gray-700"
                    >
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        className="px-4 py-2 mb-1 text-gray-700 bg-gray-200 border-none rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-white"
                        ref={authorRef}
                    />
                    {formInputsValidation.author === false && (
                        <span className='text-red-500'>Title should contain 3-25 characters.</span>
                    )}
                </div>

                <div className="flex items-center justify-between w-full">
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}