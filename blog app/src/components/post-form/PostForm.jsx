import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// iss form me ya to new Post bnane aaega user
// ya phir already existing post ko edit krne aaega

// watch - kisi field ko continuous monitor krna h then we should use watch capability of react form
// setValue - kisi field ki value set krni h then we should use setValue capability of react form
// control - to get the control of the form 

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    }); 

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

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
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    // Purpose of useCallback: useCallback is used to memoize callback functions, 
    // ensuring that the same function instance is returned as long as its dependencies remain unchanged. 
    // This helps optimize performance by preventing unnecessary re-renders of child components that rely on these callbacks.

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    //React.useEffect is a hook that allows you to perform side effects in function components. It takes a function as its first argument, which will be executed after the component has been rendered.

    // Inside the useEffect callback function, a watch function is subscribed to. This suggests that watch is likely a function or an object with a method that sets up some sort of event listener or observer.
    // The callback provided to watch is executed whenever the watched value changes.

    // Within the callback passed to watch, there's a check to see if the changed value's name property is "title". If it is, it means the title has changed.

    // If the name is "title", it executes setValue("slug", slugTransform(value.title), { shouldValidate: true }). This suggests that setValue is a function used to update state in the component. 
    // It sets the value of "slug" using slugTransform(value.title), possibly transforming the title into a slug format, and { shouldValidate: true } indicates that validation should be performed.

    // Finally, the useEffect hook returns a cleanup function that unsubscribes from the subscription. This is important to prevent memory leaks or unwanted behavior when the component unmounts or re-renders.

    // The dependency array [watch, slugTransform, setValue] specifies that the effect should re-run if any of these dependencies change. 
    // This is crucial for ensuring that the effect behaves correctly, especially when working with external functions or variables that may change over time.

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })} // post nhi hoga bina image ke
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm;