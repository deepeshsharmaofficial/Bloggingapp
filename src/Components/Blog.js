//Blogging App using Hooks
import { useState } from "react";

export default function Blog(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [blogs, setBlogs] = useState([]);
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title, content}, ...blogs]);
        console.log(blogs);
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
                            class="form-control" 
                            aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}        
                    />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                    <textarea 
                            class="form-control" 
                            aria-label="With textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                    />
                    
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn btn-primary">Add Blog</button>
            </form>
                     
        </div>

      

        {/* Section where submitted blogs will be displayed */}

        <div id="submitted-blogs">
            <h2> Blogs </h2>
            <p>
                {blogs.map((blog, index) => (
                    <div className="blog" key={index}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </div>
                ))}

            </p>
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
