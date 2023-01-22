import { Link } from "react-router-dom"

const About = () => {
  return (
    <div>
        <h4>This is my about page</h4>
        <Link to="/" className="link">Go Back</Link>
    </div>
  )
}

export default About