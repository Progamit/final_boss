import React from 'react';

const SingleComment = ({x}) => {
    return (
        <div className="my-2 border-radius-20 border border-1 border-black px-3 bg-body-secondary">
            <b> {x.username}:</b>
            <p> {x.comment}</p>
        </div>
    );
};

export default SingleComment;