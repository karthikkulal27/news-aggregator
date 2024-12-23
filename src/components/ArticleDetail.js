// ArticleDetail.js
import React from 'react';
import { getTruncatedContent } from '../utils/utils';

const ArticleDetail = ({ article }) => {
    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg my-6">
            <div className="flex items-center space-x-4">
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{article.title}</h2>
                    <p className="text-sm text-gray-500">{article.author}</p>
                    <p className="text-sm text-gray-400">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>

            <p className="mt-4 text-lg">{article.description}</p>

            <div className="mt-4">
                <p className="font-semibold">Content:</p>
                <div
                    className="prose mt-2"
                    dangerouslySetInnerHTML={{
                        __html: article.content ? getTruncatedContent(article.content) : "Content not available",
                    }}
                />
            </div>

            <div className="mt-4">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    Read full article
                </a>
            </div>
        </div>
    );
};

export default ArticleDetail;
