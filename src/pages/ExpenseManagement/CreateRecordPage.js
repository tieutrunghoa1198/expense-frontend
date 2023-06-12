import React from 'react';

const CreateRecordPage = () => {

	const handleCreateRecord = async () => {

	}

	return (
		<div className="container">
			<h1>Create Expense/Income Record</h1>
			<form className="col-5">
				<div className="form-group mb-3">
					<label htmlFor="exampleInputEmail1">Record name</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
						   placeholder="Enter email"/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Amount</label>
					<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Type</label>
					<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Note</label>
					<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				</div>
				<button type="submit" className="btn btn-primary">Create</button>
			</form>
		</div>
	);
};

export default CreateRecordPage;
