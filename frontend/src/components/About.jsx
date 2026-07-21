import "./About.css";
import { FaRobot } from "react-icons/fa";

function About() {

return(

<section className="about" id="about">

<div className="about-image">

<div className="circle">

<FaRobot style={{ fontSize: "64px", color: "#7C3AED" }} />

</div>

</div>

<div className="about-content">

<span>ABOUT US</span>

<h2>

AI Resume Builder & Reviewer

</h2>

<p>

Our platform helps students and job seekers build professional resumes,
receive AI-powered resume reviews, and generate personalized cover letters
using modern AI technology.

</p>

<div className="about-list">

<div>

✔ Easy Resume Builder

</div>

<div>

✔ AI Resume Review

</div>

<div>

✔ Cover Letter Generator

</div>

<div>

✔ Secure Login System

</div>

</div>

<button>

Learn More

</button>

</div>

</section>

)

}

export default About;