import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    
    // In this line, useParams() returns an object containing key-value pairs of URL parameters. 
    // By destructuring the returned object and extracting slug, we're retrieving the value of the slug parameter from the URL.
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        } else{
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost