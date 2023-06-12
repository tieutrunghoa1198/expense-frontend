import React, {useEffect, useState} from 'react'
import {ExpenseType} from '../constants/expense-type';
import {API_SERVICE} from '../constants/api.const';

const ExpenseRecord = ({onSubmitClick, action, initialObj}) => {
	const [formData, setFormData] = useState({
		name: initialObj ? (initialObj.name ? initialObj.name : '') : '',
		note: initialObj ? (initialObj.note ? initialObj.note : '') : '',
		type: initialObj ? (initialObj.type ? initialObj.type : '') : '',
		amount: initialObj ? (initialObj.amount ? initialObj.amount : 0) : 0,
		date: initialObj ? (initialObj.date ? initialObj.date : '') : '',
		categories: initialObj ? (initialObj.categories ? initialObj.categories : '') : ''
	});
	const [userCategories, setUserCategories] = useState(null);
	const { name, note, type, amount, date, categories } = formData;

	useEffect(() => {
		console.log(initialObj)
		getAllCategories()
	}, [])

	const handleSubmitClick = (e) => {
		e.preventDefault();
		onSubmitClick(formData)
	}

	const getAllCategories = async () => {
		try {
			const res = await API_SERVICE.Categories.getAll()
			setUserCategories(res.content)
		} catch (e) {
			console.log(e)
		}
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<form className="col-5" onSubmit={handleSubmitClick}>
			<div className="form-group mb-3">
				<label htmlFor="exampleInputEmail1">Record name</label>
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
				<label htmlFor="exampleInputPassword1">Amount</label>
				<input type="number"
					   name="amount"
					   value={amount}
					   onChange={handleChange}
					   className="form-control"
					   id="exampleInputPassword1"
					   placeholder="Amount"/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="exampleInputPassword1">Type</label>
				<select
					name="type"
					value={type}
					onChange={handleChange}
					className="form-select"
					aria-label="Default select example">
					<option value="">Choose a type of expense</option>
					<option value={ExpenseType.EXPENSE}>Expense</option>
					<option value={ExpenseType.INCOME}>Income</option>
				</select>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="exampleInputPassword1">Category</label>
				<select
					name="categories"
					value={categories}
					onChange={handleChange}
					className="form-select"
					aria-label="Default select example">
					<option value="">Open this select menu</option>
					{
						userCategories
							? (userCategories.map((category, index) => {
								return (<option key={index} value={category.id}>{category.name}</option>)
							}))
							: (<></>)
					}
				</select>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="exampleInputPassword1">Date</label>
				<input
					name="date"
					value={date}
					onChange={handleChange}
					type="date"
					className="form-control"
					id="exampleInputPassword1"
					placeholder="Password"/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="exampleInputPassword1">Note</label>
				<textarea
					name="note"
					value={note}
					onChange={handleChange}
					className="form-control"
					id="exampleFormControlTextarea1"
					rows="3"></textarea>
			</div>
			<button type="submit" className="btn btn-primary text-capitalize">{action}</button>
		</form>
	)
}

export default ExpenseRecord
