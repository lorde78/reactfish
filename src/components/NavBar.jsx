import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className='flex justify-between p-4'>
			<h1 className='text-white text-4xl'>FISH</h1>
			<div className='flex justify-between'>
				<Link>
					<button className='text-white border-white rounded border py-2 px-6 mr-2'>Sign In</button>
				</Link>
				<Link>
					<button className='text-white border-white rounded border py-2 px-6'>Sign Up</button>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
