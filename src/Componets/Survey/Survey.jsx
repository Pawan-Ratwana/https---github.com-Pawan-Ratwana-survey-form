import React, { useState } from "react";
import './Survey.css'


const Survey = ()=>{
    const [user, setUser] = useState({
        name: "",
        gender: "",
        nationality: "",
        email: "",
        phone: "",
        address: "",
        message: ""
      });
    
      const [submissionResult, setSubmissionResult] = useState(null);
    
      let name, value;
      const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
      };
    
      const PostData = async (e) => {
        e.preventDefault();
    
        const { name, gender, nationality, email, phone, address, message } = user;
    
        try {
          const res = await fetch("/form", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              gender,
              nationality,
              email,
              phone,
              address,
              message,
            }),
          });
    
          const data = await res.json();
    
          setSubmissionResult(data);
        } catch (error) {
          console.error("Error submitting form:", error);
          setSubmissionResult({
            success: false,
            message: "An error occurred while submitting the form.",
          });
        }
      };

    return(

    <div class="container">
        <div class="form-heading">
            <h1>Pawan's Survey Assignment Submission (Fullstack)
            </h1>
            
        </div>
        <div>
        <form action="/form"  method="POST">
            <div class="form-group mt-20">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your answer" value={user.name} onChange={handleInput} required />
            </div>
            <div class="form-group ">
                <label htmlFor="gender">Gender:</label>
                <div className="gender-group">
                <input type="radio" id="male" name="gender"  value={user.male} onChange={handleInput} required />
                <label className="radio-label" htmlFor="male">Male</label>

                <input type="radio" id="female" name="gender"    value={user.female} onChange={handleInput} required />
                <label className="radio-label" htmlFor="female">Female</label>

                <input type="radio" id="other" name="gender"  value={user.other} onChange={handleInput} required />
                <label className="radio-label" htmlFor="other">Other</label>
                </div>
            </div>

            
            <div class="form-group ">
                <label htmlFor="nationality">Nationality:</label>
                <input type="text" id="nationality"  name="nationality" placeholder="Your answer" value={user.nationality} onChange={handleInput} required />
            </div>

            <div class="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your answer" value={user.email} onChange={handleInput} required />
            </div>

            <div class="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="number" id="phone" name="phone" placeholder="Your answer" value={user.phone} onChange={handleInput} required />
            </div>

            <div class="form-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" rows="4" placeholder="Your answer" value={user.address} onChange={handleInput} required />
            </div>
            <div class="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Your answer" value={user.message} onChange={handleInput} required />
            </div>

            <div class="form-group mb-0">
                <input type="submit" name="submit" id="submit" value="submit" onClick={PostData} />
            </div>
        </form>
        </div>
        {submissionResult && (
        <div className={submissionResult.success ? "success" : "error"}>
          {submissionResult.message}
        </div>
      )}
    </div>
    )
}

export default Survey;