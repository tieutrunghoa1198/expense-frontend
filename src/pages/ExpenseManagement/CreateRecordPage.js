import React, {useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {ExpenseType} from '../../constants/expense-type';

const CreateRecordPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		note: '',
		type: '',
		amount: 0,
		date: '',
		categories: ''
	});
	// "name": "đi chơi",
	// 	"note": "asda",
	// 	"type": "EXPENSE",
	// 	"amount": 10000,
	// 	"date": "2023-12-30",
	// 	"categories": [1]

	const { name, note, type, amount, date, categories } = formData;
	const handleCreateRecord = async (e) => {
		e.preventDefault()
		formData.categories = [formData.categories]
		try {
			const res = await API_SERVICE.Records.create(formData)
			console.log(res)
			console.log(formData)
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
		<div className="container">
			<h1>Create Expense/Income Record</h1>
			<form className="col-5" onSubmit={handleCreateRecord}>
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
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
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
				<button type="submit" className="btn btn-primary">Create</button>
			</form>
		</div>
	);
};

export default CreateRecordPage;
