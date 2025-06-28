const InterviewCompleteLayout = ({ children }) => {

    return (
        <>
            <div className='bg-secondary pb-6 w-full fixed'>
                {children}
            </div>
        </>
    );
};

export default InterviewCompleteLayout;