import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import moment from 'moment';
import '../../styles/recordpage.css'
import {ExpenseType} from '../../constants/expense-type';
import {Link} from 'react-router-dom';
const RecordPage = () => {
	const [expRecords, setExpRecords] = useState(null);

	useEffect(() => {
		getAllExpense()
	}, [])

	const getAllExpense = async () => {
		const res = await API_SERVICE.Records.getAll()
		setExpRecords(res.content);
	}

	return (
		<div className="container">
			<h1>Expense Records</h1>
			<button className="btn btn-primary">
				<Link to="/create-record" style={{ color: 'white', textDecoration: 'none'}}>Create Expense</Link>
			</button>
			{
				expRecords
					? (<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Date</th>
								<th scope="col">Amount</th>
								<th scope="col">Type</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{expRecords.map((record, index) => {
								const rowClassName = record.type === ExpenseType.EXPENSE ? 'expense-row' : 'income-row';
								return (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{record.name}</td>
										<td>{moment(record.date).format('DD-MM-YYYY')}</td>
										<td>{record.amount}</td>
										<td className={rowClassName}>{record.type}</td>
										<td>
											<button className="btn btn-outline-primary mx-1">
												<Link to={`/records/${record.id}`} style={{ textDecoration: 'none'}}>
													Details
												</Link>
											</button>
											<button className="btn btn-outline-danger mx-1">Delete</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>)
					: (<p> There is no data for displaying! </p>)
			}
		</div>
	);
};

export default RecordPage;
