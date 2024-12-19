// ArticleModal.js
import React from 'react';
import ArticleDetail from './ArticleDetail';

const ArticleModal = ({ article, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                    X
                </button>
                <ArticleDetail article={article} />
            </div>
        </div>
    );
};

export default ArticleModal;
