import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            {/* In React, when you see <PostCard {...post} />, it's using spread attributes ({...post}) 
                            to pass the properties of the post object as props to the PostCard component. 
                            This shorthand is often used to pass a large number of props easily and efficiently. */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home