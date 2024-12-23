import React from 'react';

const PostCard = () => {
  return (
    <div className="media post-block mb-8">
      <a className="flex justify-center" href="/demo/react/papr/post/get-around-easily-with-a-new-york-limousine-service">
        <span className="relative max-w-full">
          <span className="block max-w-full">
            <img
              alt=""
              aria-hidden="true"
              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27150%27%20height=%27150%27/%3e"
              className="block max-w-full"
            />
          </span>
          <img
            alt="Get Around Easily With A New York Limousine Service"
            src="https://new.axilthemes.com/demo/react/papr/images/posts/post_9.jpg?imwidth=384"
            className="absolute inset-0 m-auto block w-full h-full object-cover"
            srcSet="https://new.axilthemes.com/demo/react/papr/images/posts/post_9.jpg?imwidth=256 1x, https://new.axilthemes.com/demo/react/papr/images/posts/post_9.jpg?imwidth=384 2x"
          />
        </span>
      </a>
      <div className="media-body">
        <div className="post-cat-group mb-2">
          <a className="post-cat cat-btn bg-blue-500 text-white p-2 rounded" href="/demo/react/papr/category/sports">
            Sports
          </a>
        </div>
        <h3 className="axil-post-title hover:text-blue-500">
          <a href="/demo/react/papr/post/get-around-easily-with-a-new-york-limousine-service">
            Get Around Easily With A New York Limousine Service
          </a>
        </h3>
        <div className="post-metas">
          <ul className="flex space-x-2">
            <li>
              <span>By</span>
              <a className="post-author text-blue-500" href="/demo/react/papr/author/xu-jianhong">
                Xu Jianhong
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
