import { ReviewProps } from "@/types";

/**
 * 
 * @returns {JSX.Element} - returns a section with movie reviews
 * @description It generates a section with movie reviews from users of the app 
 * @todo - add functionality to add reviews
 * @todo - add functionality to edit reviews
 * @todo - add functionality to delete reviews
 */
export const Reviews = () => {
    return (
        <section className="py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
            <div className="flex flex-col items-center justify-between md:flex-row">
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