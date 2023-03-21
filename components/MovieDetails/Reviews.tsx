import { ReviewProps } from "@/types";
import { CommentModal } from "../elements/CommentModal";
import {useState} from "react";

/**
 * 
 * @returns {JSX.Element} - returns a section with movie reviews
 * @description It generates a section with movie reviews from users of the app 
 * @todo - add functionality to add reviews
 * @todo - add functionality to edit reviews
 * @todo - add functionality to delete reviews
 */
export const Reviews = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModalView = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <section className="relative py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
            <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
                <Review
                    author="John Doe"
                    title="This movie is awesome"
                    content="This movie was so good. I loved it."
                />
                <Review
                    author="Jannet Kowalski"
                    title="Bad choice"
                    content="I was expecting more from this movie."
                />
                <Review
                    author="Maria Doe"
                    title="Could be better"
                    content="I liked the movie but it could have been better. I would recommend it to my friends."
                />
            </div>
            <button
                type="button"
                className={`${isModalOpen ? "hidden" : "block"}
                absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                onClick={toggleModalView}    
            >
                Add a review
            </button>
            <CommentModal 
                isModalOpen={isModalOpen}
                toggleModalView={toggleModalView}
            />
        </section>
    );
};

const Review = ({ author, title, content }: ReviewProps) => (
    <div className="w-full mb-4 mx-1 md:w-1/2 md:mb-0">
        <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-red-600 text-lg font-semibold">{title}</p>
            <p className="text-gray-500">
                {content}
            </p>
            <p className="mt-4 border-t-2 text-gray-400 italic">{author}</p>
        </div>
    </div>
);