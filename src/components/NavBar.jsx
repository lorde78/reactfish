import React from "react";

const NavBar = () => {
	return (
		<div className='flex justify-between p-4'>
			<h1 className='text-white text-4xl'>FISH</h1>
			<div className='flex justify-between'>
				<button className='text-white border-white rounded border py-2 px-6 mr-2'>Sign In</button>
				<button className='text-white border-white rounded border py-2 px-6'>Sign Up</button>
			</div>
		</div>
	);
}

export default NavBar;
