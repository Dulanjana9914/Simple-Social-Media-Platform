import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const newposts=posts.slice(0).reverse();
  const getPosts = async () => {
    const response = await fetch("http://localhost:8070/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
      getPosts();
   
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //map through posts 
  return (
    <>
      
      {newposts.map(
        ({
          _id,
          userId,
          picture,
          savedDate,
          savedBy,
          description,
          likes
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            userId={userId}
            picture={picture}
            savedDate={savedDate}
            savedBy={savedBy}
            description={description}
            likes={likes}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
