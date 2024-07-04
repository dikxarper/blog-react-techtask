import React from "react";

const About: React.FC = () => {
    return (
        <div className="about">
            <div className="section">
                <p>I used DummyJSON to simulate the real api requests:</p>
                Link: <a href="https://dummyjson.com/docs">https://dummyjson.com/docs</a>
            </div>
            <hr />
            <div className="section">
                <p>CRUD operations:</p>
                <ul>
                    <li>
                        <h5>Adding the Post</h5>
                        <p>There is simulation that will return new created post with a new id. If you want to see the result, you can check console.</p>
                    </li>
                    <li>
                        <h5>Editing the Post</h5>
                        <p>Data changes using useState(). Also, it has the same simulation with API. Check console.</p>
                    </li>
                    <li>
                        <h5>Deleting the Post</h5>
                        <p>It just redirects the user to the previous (main) page. Also, it has the same simulation with API. Check console.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;