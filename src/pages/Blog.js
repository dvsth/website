import React, { useState } from "react";
import BlogWrapper from "../components/BlogWrapper"

import "../styles/page.css"
// render list of blog posts
function Blog() {
    const [open, setOpen] = useState(null)
    const files = [require("../posts/post1.md")]
    console.log(files)
    return (
        <div className="page">
            <ul className="page-text">
            Work in progress. I will add more features and styling with time. <br/> <br/>
            {files.map(
                (file, idx) => 
                    <li className="blog-list">
                        {open === idx 
                        ? <BlogWrapper file={file} />
                        : <h3 style={{cursor: "pointer"}} onClick={() => setOpen(idx)}>Blog #{idx}</h3>    
                    }
                    </li>
            )}
            </ul>
        </div>
    )
}

export default Blog;
