import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className='flex justify-between p-4'>
			<Link to='/'>
				<h1 className='text-white text-4xl'>FISH</h1>
			</Link>
			<div className='flex justify-between'>
				<Link to='/login'>
					<button className='text-white border-white rounded border py-2 px-6 mr-2'>Sign In</button>
				</Link>
				<Link to='/signup'>
					<button className='text-white border-white rounded border py-2 px-6'>Sign Up</button>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
