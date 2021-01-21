import React, { useEffect, useState } from 'react'

function Applications() {
	const [data, setData] = useState([])
	useEffect(() => {
		fetch('/students')
			.then(res => res.json())
			.then(data => setData(data))
	}, [data])
	return (
		<div>
			{data.map((datum, id) => (
				<p key={id}>{datum.fullName}</p>
			))}
		</div>
	)
}

export default Applications
