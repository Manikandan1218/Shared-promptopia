"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Forms from "@components/Forms";

const updatePost = () => {
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptDetails = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    console.log("ress", data);
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };

  useEffect(() => {
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!promptId) {
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setSubmit(true);
    }
  };

  return (
    <Forms
      type="Update"
      post={post}
      submit={submit}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
};

export default updatePost;
