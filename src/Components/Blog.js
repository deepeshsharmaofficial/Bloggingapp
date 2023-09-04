//Blogging App using Hooks
import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "../firebaseInit";
import { collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteField, deleteDoc } from "firebase/firestore"; 

// function blogsReducer(currentState, action) {
//     switch(action.type) {
//         case "ADD":
//             return [action.blog, ...currentState];
//         case "REMOVE":
//             return currentState.filter((blog, index) => action.index !== index);
//         default:
//             return [];
//     }
// }

export default function Blog(){

    const [formData, setFormData] = useState({title: "", content: ""});
    
    const [blogs, setBlogs] = useState([]);
    // const [blogs, dispatch] = useReducer(blogsReducer, []);
    
    const titleRef = useRef(null);

    // Equivalent to ComponentDidMount
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    // I just want the title to be changes when blogs are getting updated
    useEffect(() => {
        if(blogs.length && blogs[0].title) {
            document.title = blogs[0].title;
        } else {
            document.title = "No Blogs!";
        }
    }, [blogs])

    useEffect(() => {
        // async function fetchData() {
        //     const querySnapshot = await getDocs(collection(db, "blogs"));
        //     const blogs = querySnapshot.docs.map((doc) => {
        //         return {
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     console.log("Blogs", blogs);
        //     setBlogs(blogs);
        // }
        // fetchData();
        
        // Realtime Updates
        onSnapshot(collection(db, "blogs"), (querySnapshot) => {
            const blogs = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log("Blogs", blogs);
            setBlogs(blogs);
        });

    }, [])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();

        // setBlogs([{title : formData.title, content : formData.content}, ...blogs]);
        // dispatch({type : "ADD", blog:{title : formData.title, content : formData.content}})

        // Add a new document with a generated id.
        await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });
        // console.log("Document written with ID: ", docRef.id);  

        setFormData({title: "", content: ""});
        titleRef.current.focus();

        console.log(blogs);
    }

    async function removeBlog(i) {
        // setBlogs(blogs.filter((blog, index) => i !== index));
        // dispatch({type: "REMOVE", index: i});

        const docRef = doc(db, "blogs", i);
        await deleteDoc(docRef);
    }

    return(
        <div className="container">
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>
     
        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                    <input type="text" 
                            className="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-lg"
                            value={formData.title}
                            onChange={(e) => setFormData({title: e.target.value, content: formData.content})}
                            ref={titleRef}        
                    />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                    <textarea 
                            className="form-control" 
                            aria-label="With textarea"
                            value={formData.content}
                            required
                            onChange={(e) => setFormData({title: formData.title, content: e.target.value})}
                    />
                    
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn btn-primary btn-add">Add Blog</button>
            </form>
                     
        </div>

      

        {/* Section where submitted blogs will be displayed */}

        <div id="submitted-blogs">
            <h2> Blogs </h2>
         
                {blogs.map((blog, index) => (
                    <div className="blog" key={index}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>

                        <div className="blog-btn">
                            <button className = "btn btn-danger" onClick={() => removeBlog(blog.id)}>
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

        </div>
        </div>
    )
}

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
