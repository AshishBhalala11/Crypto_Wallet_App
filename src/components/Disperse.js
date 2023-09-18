import React, { useState } from 'react';
import BNB_Icon from "../static/images/BNB_icon.svg"
import ETH_Icon from "../static/images/ETH_icon.svg"


const Disperse = () => {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [uniqueAddress, setUniqueAddress] = useState(new Map());

	const validateInput = (input) => {
		if (!input) {
			setError(['Input is empty']);
			return false;
		}
		return true;
	};

	const onSubmit = () => {
		setError('');
		setShowOptions(false);

		if (!validateInput(inputValue)) {
			return;
		}
		const errors = [];

		const addressMap = new Map();

		// Split the input by lines to process each address and amount pair
		const inputLines = inputValue.trim().split('\n');

		inputLines.forEach((line, i) => {
			if (!line) {
				return false;
			}
			// Split each line into address and amount
			const [address, amount] = line.trim().split(/[\s,=]/).map((itm => itm.trim()));

			// Check if the address length is 42 characters
			if (address.length !== 42) {
				errors.push('Address needs 42 characters in line ' + (i + 1) + ': ' + address);
			}

			if (!address.startsWith('0x')) {
				errors.push('Address needs to start with 0x in line ' + (i + 1) + ': ' + address);
			}

			// Check if the amount is a valid number
			if (isNaN(amount) || parseFloat(amount) <= 0) {
				errors.push('Invalid amount in line ' + (i + 1) + ': ' + amount);
			}

			// Check for duplicate addresses
			if (addressMap.has(address)) {
				addressMap.get(address).push(i + 1);
			} else {
				addressMap.set(address, [i + 1]);
			}
		});

		setUniqueAddress(addressMap);

		addressMap.forEach((lineNumbers, address) => {
			if (lineNumbers.length > 1) {
				errors.push(`Address ${address} encountered duplicate in line: ${lineNumbers.join(', ')}`);
				setShowOptions(true);
			}
		});

		if (errors.length > 0) {
			setError(errors);
			return false;
		}

		setError('');
		return true;
	}

	const keepFirstOne = () => {
		const inputLines = inputValue.trim().split('\n');
		const uniqueLines = [];
		inputLines.forEach((line, i) => {
			if (!line) {
				return false;
			}
			const [address] = line.trim().split(/[\s,=]/).map((itm) => itm.trim());

			if (!uniqueAddress.has(address) || uniqueAddress.get(address)[0] === i + 1) {
				uniqueLines.push(line);
			}
		});

		setInputValue(uniqueLines.join('\n'));
		setError('');
		setShowOptions(false);
	};

	const combineBalances = () => {
		const combinedAddressMap = new Map();

		const inputLines = inputValue.trim().split('\n');

		inputLines.forEach((line) => {
			if (!line) {
				return false;
			}
			const [address, amount] = line.trim().split(/[\s,=]/).map((itm) => itm.trim());

			if (combinedAddressMap.has(address)) {
				combinedAddressMap.set(address, combinedAddressMap.get(address) + parseFloat(amount));
			} else {
				combinedAddressMap.set(address, parseFloat(amount));
			}
		});

		const combinedLines = [];

		combinedAddressMap.forEach((balance, address) => {
			combinedLines.push(`${address} ${balance}`);
		});

		setInputValue(combinedLines.join('\n'));
		setError('');
		setShowOptions(false);
	};

	return (
		<div className="mt-24 mx-12 mb-12 rounded-3xl bg-white flex justify-center">
			<div className="flex flex-col justify-center w-2/3 pt-16 pb-8">
				<h3 className="text-4xl font-medium">Prepare to scatter</h3>
				<div className="mt-2">We support the following Networks</div>
				<div className="flex gap-8 mt-6 ml-4">
					<div>
						<img className="inline" src={ETH_Icon} alt="" />
						<span>Ethereum Mainnet</span>
					</div>
					<div>
						<img className="inline" src={BNB_Icon} alt="" />
						<span>Binance Smart Chain</span>
					</div>
				</div>
				<div className="mt-6 ml-2 font-medium">Token Address</div>
				<input placeholder="Select or search by address" className="block border p-4 w-full bg-slate-100 mt-2" />
				<div className="mt-6 ml-2 font-medium">Addresses with Amounts</div>
				<textarea
					rows="10"
					className="block border p-2 w-full bg-slate-100 mt-2"
					placeholder="Enter Address and Amount seperated by ',' or ' ' or '=' and Each Address in a new line."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				></textarea>
				{showOptions ? (
					<div className="flex justify-end text-red-500 mt-2">
						<span className="cursor-pointer" onClick={keepFirstOne}>Keep the first one</span>
						<span className="mx-2">|</span>
						<span className="cursor-pointer" onClick={combineBalances}>Combine Balance</span>
					</div>
				) : null}
				{(error && error.length) ? (
					<div className="border border-red-500 rounded-lg py-2 px-8 mt-2">
						{error.map((err, index) => (
							<p key={index} className="text-red-500">
								{err}
							</p>
						))}
					</div>
				) : null}
				<button className="block mt-4 p-4 bg-violet-500 text-white rounded-full mb-4" onClick={onSubmit}>
					Next
				</button>
			</div>
		</div>
	)
}

export default Disperse;