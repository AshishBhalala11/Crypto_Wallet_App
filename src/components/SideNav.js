/* eslint-disable no-script-url */
import React from 'react';
import icon from '../static/images/icon.svg';

const SideNav = () => {
	return (
		<>
			<img className="my-10 mx-auto" alt="Sidebar Logo" width="165px" src={icon}></img>
			<ul className="px-8 space-y-2">
				<li className="py-3 pl-8 rounded-xl cursor-pointer text-gray-600 hover:bg-blue-800 hover:text-white">
					<a href="JavaScript:void(0);" className="">Dashboard</a>
				</li>
				<li className="py-3 px-8 rounded-xl cursor-pointer text-gray-600 hover:bg-blue-800 hover:text-white">
					<a href="JavaScript:void(0);" className="">Gatherpool</a>
				</li>
				<li className="py-3 px-8 rounded-xl cursor-pointer bg-blue-800 text-white">
					<a href="JavaScript:void(0);" className="">Scatter</a>
				</li>
			</ul>
		</>

	);
}

export default SideNav;
