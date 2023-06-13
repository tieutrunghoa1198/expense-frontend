import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import moment from 'moment';
import '../../styles/recordpage.css'
import {ExpenseType} from '../../constants/expense-type';
import {Link} from 'react-router-dom';
import UploadCSV from '../../components/UploadCSV';
const RecordPage = () => {
	const [expRecords, setExpRecords] = useState(null);
	const [isDescendingAmount, setIsDescendingAmount] = useState(false);
	const [isDescendingDate, setIsDescendingDate] = useState(false);
	useEffect(() => {
		getAllExpense()
	}, [])

	const getAllExpense = async () => {
		const res = await API_SERVICE.Records.getAll()
		setExpRecords(res.content);
	}

	const handleDelete = async (id) => {
		try {
			await API_SERVICE.Records.delete(id)
			await getAllExpense()
		} catch (e) {
			console.log(e.message)
		}
	}

	const totalAmount = () => {
		let total = 0;
		expRecords.forEach(record => {
			if (record.type === ExpenseType.INCOME) total += record.amount;
			else total -= record.amount;
		})
		return total.toLocaleString() + 'đ';
	}

	const sortByAmount = () => {
		setIsDescendingAmount(!isDescendingAmount);
		if (expRecords && expRecords.length > 0) {
			const sortedDate = [...expRecords]
			const sorted = sortedDate.sort((a, b) => {
				if (isDescendingAmount) return b.amount - a.amount
				else return a.amount - b.amount
			})
			setExpRecords(sorted)
		}
	}

	const sortByDate = () => {
		setIsDescendingDate(!isDescendingDate)
		if (expRecords && expRecords.length > 0) {
			const sortedDate = [...expRecords]
			const sorted = sortedDate.sort((a, b) => {
				if (isDescendingDate) return Date.parse(b.date) - Date.parse(a.date)
				else return Date.parse(a.date) - Date.parse(b.date)
			})
			setExpRecords(sorted)
		}
	}

	const handleUpload = async (data) => {
		console.log(data)
		for ( let i = 0; i < data.length; i ++) {
			const foundCategory = await API_SERVICE.Categories.getOne()
			// const res = await API_SERVICE.Records.create(data[0])
		}

	}

	return (
		<div className="container">
			<h1>Expense Records</h1>
			<button className="btn btn-primary mb-3 col-2">
				<Link to="/records/create" style={{ color: 'white', textDecoration: 'none'}}>Create Expense</Link>
			</button>
			{
				expRecords && expRecords.length > 0
					? (<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">
										<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
									</th>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col" onClick={sortByDate}>Date</th>
									<th scope="col" onClick={sortByAmount}>Amount</th>
									<th scope="col">Type</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{expRecords.map((record, index) => {
									const rowClassName = record.type === ExpenseType.EXPENSE ? 'expense-row' : 'income-row';
									return (
										<tr key={index}>
											<td>
												<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
											</td>
											<th scope="row">{index + 1}</th>
											<td>{record.name}</td>
											<td>{moment(record.date).format('DD-MM-YYYY')}</td>
											<td>{record.amount.toLocaleString()}</td>
											<td className={rowClassName}>{record.type}</td>
											<td>
												<Link to={`/records/${record.id}`} style={{ textDecoration: 'none'}}>
													<button className="btn btn-outline-primary mx-1">
													Detail
													</button>
												</Link>

												<Link to={`/records/edit/${record.id}`} style={{ textDecoration: 'none'}}>
													<button className="btn btn-outline-primary mx-1">
													Edit
													</button>
												</Link>

												<button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(record.id)}>
												Delete
												</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="mb-3">
							<span className="fw-bold">Total: </span> {totalAmount()}
						</div>
						<UploadCSV onUpload={handleUpload}/>
					</div>)
					: (<p> There is no data for displaying! </p>)
			}
		</div>
	);
};

export default RecordPage;
