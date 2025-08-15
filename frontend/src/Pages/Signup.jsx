import React, { useState } from 'react'
import api_url from '../utils';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const HandleSignup = async (req, res) => {
        try {
            if (!name || !email || !password) {
                console.log("name, email or password can't be empty");
                return;
            }
            const url = `${api_url}/api/user/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message || "Signup failed");
                return;
            }
            console.log("Signup successful", data);
            console.log(error.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-blue-950 h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white mb-8">Signup</h1>
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className='bg-black text-white py-2 rounded-2xl'
                    onClick={HandleSignup}
                >SignUp</button>
                <Link to="/signin">Already have an account <span className='text-blue-700'>Sign In</span></Link>

            </div>
        </div>
    )
}

export default Signup