import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../constants/api.const';

const Categories = ({handleOnChange}) => {
	const [userCategories, setUserCategories] = useState([]);
	useEffect(() => {
		getAllCategories()
	}, [])
	const handleChange = (e) => {
		handleOnChange(e.target.value)
	}
	const getAllCategories = async () => {
		try {
			const res = await API_SERVICE.Categories.getAll()
			setUserCategories(res.content)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<select className="form-select" aria-label="Default select example" onChange={handleChange}>
			<option value="">Categories</option>
			{
				userCategories
					? (userCategories.map((category, index) => {
						return (<option key={index} value={category.id}>{category.name}</option>)
					}))
					: (<></>)
			}
		</select>
	)
}

export default Categories
