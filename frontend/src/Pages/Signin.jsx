import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleSignin = async () => {
        try {
            if (!email || !password) {
                console.log("Email or password can't be empty");
                return;
            }
            const url = `${api_url}/api/user/signin`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message || "Signin failed");
                return;
            }
            console.log("Signin successful", data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-blue-950 h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white mb-8">Signin</h1>
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4 w-80">
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
                    onClick={HandleSignin}
                >SignIn</button>
                <Link to="/signup">Doesn't have an account <span className='text-blue-700'>Sign Up</span></Link>
            </div>
        </div>
    )
}

export default Signin