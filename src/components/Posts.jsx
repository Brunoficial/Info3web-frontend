import Post from "./Post";
import ApiService from "../service/ApiService";
import { useEffect, useState } from "react";

export default function Posts({ id = "" }) {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { get, post } = ApiService;

  const handlePeriodicPosts = async () => {
    const fetch = id
      ? get(`/post/listar_por_autor_id/${id}`)
      : get("/post/listar");

    const { data } = await fetch;
    setPosts(data.reverse());
  };

  // 🔹 carrega posts curtidos do usuário
  const loadLikedPosts = async () => {
    try {
      const { data } = await get("/post/curtidos"); 
      // data = [1, 3, 8]
      setLikedPosts(new Set(data));
    } catch {
      setLikedPosts(new Set());
    }
  };

  // 🔹 curtir / descurtir
  const handleLike = async (postId, isLiked) => {
    // atualização otimista
    setPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              curtidas: isLiked
                ? post.curtidas - 1
                : post.curtidas + 1
            }
          : post
      )
    );

    setLikedPosts(prev => {
      const next = new Set(prev);
      isLiked ? next.delete(postId) : next.add(postId);
      return next;
    });

    // backend
    await post(`/post/curtir/${postId}`);
  };

  useEffect(() => {
    handlePeriodicPosts();
    loadLikedPosts();

    const interval = setInterval(() => {
      if (localStorage.getItem("@info3web/userPayload/token")) {
        handlePeriodicPosts();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (posts.length === 0) {
    return <p>No posts yet, mate. Come back later</p>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-y-10">
        {posts.map(postItem => (
          <Post
            key={postItem.id}
            postData={postItem}
            liked={likedPosts.has(postItem.id)}
            onLike={handleLike}
          />
        ))}
      </ul>
    </div>
  );
}
