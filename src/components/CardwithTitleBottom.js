import React from 'react';

const defaultImage = "https://via.placeholder.com/400x300?text=No+Image+Found";

const CardwithTitleBottom = ({ article }) => {
  const imageUrl = article?.urlToImage || defaultImage;

  return (
    <div className="relative bg-white shadow-md w-full h-full">
      {/* Article Image */}
      <img
        src={imageUrl}
        alt={article?.title}
        className="w-full h-full object-cover"
      />

      {/* Article Details */}
      <div className="absolute bottom-4 left-4 text-white w-full px-4">
        {/* Source */}
        <p className="text-white-500 font-medium text-sm py-5">
          <span className='bg-red-500 px-2'>
          Source: {article?.source?.name}
          </span>
        </p>

        {/* Title */}
        <h3 className="font-semibold text-xl mb-2 bg-black bg-opacity-50 p-2 rounded-md">
          {article?.title}
        </h3>

        {/* Author */}
        <p className="font-light text-sm">{article?.author ? `By ${article?.author}` : 'Author Unknown'}</p>
      </div>
    </div>
  );
};

export default CardwithTitleBottom;
