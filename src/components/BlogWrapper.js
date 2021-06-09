import React, { useEffect, useState } from "react"
import Markdown from 'markdown-to-jsx';

// render a blog post given the post ID
export default function BlogWrapper(props) {

    // const [markdown, setMarkdown] = useState("")

    // useEffect(() => {
    //     fetch(props.path)
    //         .then(response => {
    //             return response.text()
    //         })
    //         .then(text => {
    //             console.log(text)
    //            setMarkdown(path)
    //         })
    //         .catch(e => {console.error("error was",e)})
    // }, [props.id])

    // return (<div className="blogwrapper">
    //     <Markdown>{markdown}</Markdown>
    // </div>)

    return (<div className="blogwrapper">
        <Markdown>{props.file}</Markdown>
    </div>)
}
