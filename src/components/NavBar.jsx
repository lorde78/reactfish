import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";  // Assurez-vous que UserAuth est bien le hook correct.

const NavBar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");  // Redirige vers la page d'accueil après déconnexion
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='flex justify-between items-center p-4 bg-gray-800'>
			<Link to='/'>
				<h1 className='text-white text-4xl'>FISH</h1>
			</Link>
			{user ? (
				<div className='flex items-center'>
					<span className='text-white mr-4'>Bienvenue: {user.email}</span>
					<Link to='/account'>
						<button className='text-white border-white rounded border py-2 px-6 mr-2'>Account</button>
					</Link>
					<button onClick={handleLogout} className='text-white border-white rounded border py-2 px-6'>Log Out</button>
				</div>
			) : (
				<div className='flex items-center'>
					<Link to='/login'>
						<button className='text-white border-white rounded border py-2 px-6 mr-2'>Sign In</button>
					</Link>
					<Link to='/signup'>
						<button className='text-white border-white rounded border py-2 px-6'>Sign Up</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default NavBar;
