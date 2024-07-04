import React from "react";

const About: React.FC = () => {
    return (
        <div className="about">
            <div className="section">
                <p>I used MockAPI to simulate the real api requests:</p>
                Link: <a href="https://mockapi.io/">https://mockapi.io/</a>
            </div>
            <hr />
            <div className="section">
                <p>CRUD operations:</p>
                <ul>
                    <li>
                        <h5>Adding the Post</h5>
                        <p>You will be redirected to last page after adding new post.</p>
                    </li>
                    <li>
                        <h5>Editing the Post</h5>
                        <p>The data will be changed dynamically.</p>
                    </li>
                    <li>
                        <h5>Deleting the Post</h5>
                        <p>You will be redirected to main page after deleting the post in 5 seconds.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;