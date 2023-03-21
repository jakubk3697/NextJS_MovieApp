interface CommentModalProps {
    isModalOpen: boolean;
    toggleModalView: () => void;
}

export const CommentModal = ({isModalOpen, toggleModalView}:CommentModalProps) => {
    return (
        <form 
            className={`${isModalOpen ? "block":"hidden"}  mx-auto py-5 mt-5 md:w-2/3`}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-black">Add a review</h2>
                <CustomInput title="Title" />
                <CustomInput title={"Content"} />
                <CustomInput title={"Author"} />
                <div className="flex items-center justify-between w-full">
                    <button 
                    type="button" 
                    className="px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    onClick={toggleModalView}
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

const CustomInput = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor="title" className="mb-2 text-sm font-bold text-gray-700">{title}</label>
            <input type="text" id={title} className="px-4 py-2 mb-4 text-gray-700 bg-gray-200 border-none rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-white" />
        </div>
    )
}