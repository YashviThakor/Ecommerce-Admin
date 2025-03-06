import React, { useState, useEffect } from "react";
import { Card, Button, Input, Modal, Layout, Spin, message, Space } from "antd";
import axios from "axios";

const { Content } = Layout;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      message.success("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post.");
    }
  };

  const openEditModal = (post) => {
    setCurrentPost(post);
    setTitle(post.title);
    setBody(post.body);
    setIsModalOpen(true);
  };

  const handleEdit = async () => {
    if (!title.trim() || !body.trim()) {
      message.warning("Title and Body cannot be empty!");
      return;
    }

    try {
      await axios.put(`https://dummyjson.com/posts/${currentPost.id}`, { title, body });
      setPosts(posts.map((post) => (post.id === currentPost.id ? { ...post, title, body } : post)));
      setIsModalOpen(false);
      message.success("Post updated successfully.");
    } catch (error) {
      console.error("Error updating post:", error);
      message.error("Failed to update post.");
    }
  };

  const openCreateModal = () => {
    setTitle("");
    setBody("");
    setIsCreateModalOpen(true);
  };

  const handleCreate = async () => {
    if (!title.trim() || !body.trim()) {
      message.warning("Title and Body cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/posts/add", {
        title,
        body,
        userId: 1, // Example 
      });
      setPosts([{ ...response.data, id: posts.length + 1 }, ...posts]);
      setIsCreateModalOpen(false);
      message.success("Post created successfully.");
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Content>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
           Blog Posts
        </h1>

        <Button type="primary" onClick={openCreateModal} style={{ marginBottom: "20px" }}>
          Create New Post
        </Button>

        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "auto" }} />
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {posts.map((post) => (
              <Card key={post.id} title={post.title} style={{ width: 350, borderRadius: "10px" }}>
                <p>{post.body}</p>
                <Space>
                  <Button type="primary" onClick={() => openEditModal(post)}>Edit</Button>
                  <Button danger onClick={() => deletePost(post.id)}>Delete</Button>
                </Space>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Post Modal */}
        <Modal title="Edit Post" open={isModalOpen} onOk={handleEdit} onCancel={() => setIsModalOpen(false)}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input.TextArea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} style={{ marginTop: 10 }} />
        </Modal>

        {/* Create Post Modal */}
        <Modal title="Create Post" open={isCreateModalOpen} onOk={handleCreate} onCancel={() => setIsCreateModalOpen(false)}>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input.TextArea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} style={{ marginTop: 10 }} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default BlogPage;
