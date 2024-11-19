import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const theme = useTheme();

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        bgcolor: theme.palette.background.default,
        p: 2,
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens
      }}
    >
      <Box
        sx={{
          flex: 2,
          px: 2,
          width: { xs: "100%", md: "65%" }, // Adjust width based on screen size
        }}
      >
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          style={{
            marginBottom: theme.spacing(2),
          }}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          style={{
            marginBottom: theme.spacing(2),
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          px: 2,
          width: { xs: "100%", md: "30%" }, // Adjust width based on screen size
        }}
      >
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          style={{
            marginBottom: theme.spacing(2),
          }}
        />
        {post && (
          <Box sx={{ width: "100%", mb: 2 }}>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              style={{
                width: "100%",
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[1],
              }}
            />
          </Box>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
          style={{
            marginBottom: theme.spacing(2),
          }}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          sx={{
            width: "100%",
            backgroundColor: post
              ? theme.palette.success.main
              : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              post ? theme.palette.success.main : theme.palette.primary.main
            ),
          }}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
