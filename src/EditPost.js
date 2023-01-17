import { /*useState, useContext,*/ useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
// import api from './api/posts';
// import DataContext from './context/DataContext';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    //const { posts, setPosts } = useContext(DataContext);
    // const [editTitle, setEditTitle] = useState('');
    // const [editBody, setEditBody] = useState('');
    
    //const posts = useStoreState((state) => state.posts);
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)
    
    //const post = posts.find(x => (x.id).toString() === id);
    const getPostById = useStoreState(state => state.getPostById);
    const post = getPostById(id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = /*async*/ (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, datetime, title: editTitle, body: editBody };
        // try {
        //     const response = await api.put(`/posts/${id}`, updatedPost);    
        //     setPosts(posts.map(x => x.id === id ? { ...response.data } : x));
        //     setEditTitle('');
        //     setEditBody('');
        //     navigate("/");
        // } catch (err) {
        //     console.log(`Error: ${err.message}`);    
        // }
        editPost(updatedPost);
        navigate(`/post/${id}`);
    }    

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to="/">Visit Our HomePage</Link>
                    </p>
                </>
            }
        </main >
    )
}

export default EditPost