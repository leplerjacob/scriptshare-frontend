import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import {getCode} from '../actions/content'

const Content = () => {
    
    const {slug} = useParams()
    const [content, setContent] = useState(null)

    useEffect(() => {
        setContent(getCode(slug))
    }, [slug])

    return (
        <div>
            {content ? content.body : <p>Not Found</p>}
        </div>
    )
}

export default Content
