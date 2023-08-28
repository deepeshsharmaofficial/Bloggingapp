//Blogging App using Hooks
import { useState } from "react";

export default function Blog(){

    const [formData, setFormData] = useState({title: "", content: ""});
    const [blogs, setBlogs] = useState([]);
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title : formData.title, content : formData.content}, ...blogs]);
        setFormData({title: "", content: ""});
        console.log(blogs);
    }

    function removeBlog(i) {
        setBlogs(blogs.filter((blog, index) => i !== index));

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
                    />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                    <textarea 
                            className="form-control" 
                            aria-label="With textarea"
                            value={formData.content}
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
                            <button className = "btn btn-danger" onClick={() => removeBlog(index)}>
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
