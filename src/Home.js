import { useState, useEffect } from "react";
import BlogList from './Bloglist';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setError] =useState(null);

    useEffect(() =>{
        fetch('http://localhost:3000/blogs')
            .then(res =>{
                if(!res.ok){
                    throw Error('could not fetch data ')
                }
              return  res.json();
            })
            .then(data =>{
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setIsPending(false);
            })
    },[]);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>loading...</div>}
         {blogs && <BlogList blogs={blogs} />}
        </div>
    );
}
 
export default Home;