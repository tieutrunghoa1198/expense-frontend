import React, { useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {useParams} from 'react-router-dom';

const UpdateCategory = () => {
	const { id } = useParams()
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});
	const [error, setError] = useState('');
	const { name, description } = formData;

	const handleUpdateCategory = async (e) => {
		e.preventDefault()
		setError('')
		formData.categories = [formData.categories]
		try {
			const categoryId = Number.parseInt(id)
			const res = await API_SERVICE.Categories.update(formData,categoryId)
			setError('Create successfully!')
			console.log(res)
		} catch (e) {
			setError(e.message)
			console.log(e.message)
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};



	return (       
		<div className="container">
			<h1>Update Category</h1>
			<form className="col-5" onSubmit={handleUpdateCategory}>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputEmail1">Category name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
					    placeholder="Name"/>
				</div>


				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Description</label>
					<textarea
						name="description"
						value={description}
						onChange={handleChange}
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="3"></textarea>
				</div>
				<button type="submit" className="btn btn-primary">Update</button>
			</form>
			{error && <div>{error}</div>}
		</div>		
	);
};

export default UpdateCategory;
