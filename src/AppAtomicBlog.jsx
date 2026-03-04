import { useEffect, useState } from "react";
import styles from "./AtomicBlog/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectQuery, setSearchQuery } from "./features/atomicBlog/querySlice";
import {
  addPost,
  clearPosts,
  selectArchivePosts,
  selectPosts,
} from "./features/atomicBlog/postsSlice";

function AppAtomicBlog() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle(styles.fakeDarkMode);
    },
    [isFakeDark],
  );

  return (
    <div className={styles.atomicBlogBody}>
      <section className={styles.section}>
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className={styles.btnFakeDarkMode}
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>

        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </div>
  );
}

function Header() {
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div className={styles.headerDiv}>
        <Results />
        <SearchPosts />
        <button
          className={styles.button}
          onClick={() => dispatch(clearPosts())}
        >
          Clear posts
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const searchQuery = useSelector(selectQuery);
  const dispatch = useDispatch();

  return (
    <input
      className={styles.input}
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const searchQuery = useSelector(selectQuery);
  const posts = useSelector(selectPosts);

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  return <p>🚀 {searchedPosts.length} atomic posts found</p>;
}

function Main() {
  return (
    <main className={styles.main}>
      <FormAddPost />
      <Posts />
    </main>
  );
}

function Posts() {
  return (
    <section className={styles.section}>
      <List />
    </section>
  );
}

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    dispatch(addPost({ title, body }));
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        className={styles.textarea}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button className={styles.button}>Add post</button>
    </form>
  );
}

function List() {
  const searchQuery = useSelector(selectQuery);
  const posts = useSelector(selectPosts);

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  return (
    <ul>
      {searchedPosts.map((post, i) => (
        <li key={i}>
          <h3 className={styles.h3}>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  // const [posts] = useState(() =>
  //   // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
  //   Array.from({ length: 10000 }, () => createRandomPost()),
  // );
  const archivePosts = useSelector(selectArchivePosts);
  const [showArchive, setShowArchive] = useState(false);
  const dispatch = useDispatch();
  return (
    <aside className={styles.aside}>
      <h2 className={styles.h2}>Post archive</h2>
      <button
        className={styles.button}
        onClick={() => setShowArchive((s) => !s)}
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {archivePosts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button
                className={styles.button}
                onClick={() => dispatch(addPost(post))}
              >
                Add as new post
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default AppAtomicBlog;
