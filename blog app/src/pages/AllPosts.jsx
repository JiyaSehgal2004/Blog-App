import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {}, [])

    // The reason posts.documents is used instead of simply posts in the setPosts function is likely due to the 
    // structure of the data returned by the appwriteService.getPosts([]) call.
    // When you're working with an API like Appwrite, the response data often comes wrapped in an object containing metadata or additional information along with the actual data you're interested in. 
    // In this case, posts seems to be an object containing a property named documents which holds the array of post documents.
    
    // and the query is by default equal to "status","active" if not provided

    appwriteService.getPosts([])
    .then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8'>
      <Container>
      <div className='flex flex-wrap'>
        {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
            <PostCard post={post} />
            </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts