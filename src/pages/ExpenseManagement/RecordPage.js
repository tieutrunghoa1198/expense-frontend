import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import moment from 'moment';
import '../../styles/recordpage.css'
import {ExpenseType} from '../../constants/expense-type';
import {Link} from 'react-router-dom';
import UploadCSV from '../../components/UploadCSV';
import Years from '../../components/Years';
import Months from '../../components/Months';
import Categories from '../../components/Categories';
const RecordPage = () => {
	const [expRecords, setExpRecords] = useState(null);
	const [filteredRecords, setFilteredRecords] = useState(null);
	const [isDescendingAmount, setIsDescendingAmount] = useState(false);
	const [isDescendingDate, setIsDescendingDate] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [selectedRows, setSelectedRows] = useState([]);
	useEffect(() => {
		getAllExpense()
	}, [])

	useEffect(() => {
		filter();
	}, [selectedMonth, selectedYear, selectedCategory])

	const getAllExpense = async () => {
		const res = await API_SERVICE.Records.getAll()
		setExpRecords(res.content);
		setFilteredRecords(res.content);
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
			setFilteredRecords(sorted)
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
			setFilteredRecords(sorted)
		}
	}

	const handleUpload = async (data) => {
		console.log(data)
		for ( let i = 0; i < data.length; i ++) {
			// const foundCategory = await API_SERVICE.Categories.getOne()
		}

	}

	const handleMonthsChange = (data) => {
		setSelectedMonth(data)
	}
	const handleYearsChange = (data) => {
		setSelectedYear(data)
	}
	const handleCategoryChange = (data) => {
		setSelectedCategory(Number.parseInt(data))
	}

	const filter = async () => {
		if (selectedMonth.length === 0 && selectedYear.length === 0 && selectedCategory === 0) {
			await getAllExpense()
			return;
		}

		const cloneExpRecords = [...expRecords]
		const filtered = cloneExpRecords.filter((record) => {
			const date = moment(Date.parse(record.date)).format('YYYY-MM-DD');
			const month = date.split('-')[1];
			const year = date.split('-')[0];
			const categoryId = Number.parseInt(record.categories[0].id);
			const monthMatch = selectedMonth ? month === selectedMonth : true
			const yearMatch = selectedYear ? year === selectedYear : true
			const categoryMatch = selectedCategory ? categoryId === selectedCategory : true
			return monthMatch && yearMatch && categoryMatch;
		})
		setFilteredRecords(filtered);
	}

	const handleCheckboxChange = (event, rowId) => {
		if (event.target.checked) {
			setSelectedRows([...selectedRows, rowId]);
		} else {
			setSelectedRows(selectedRows.filter(id => id !== rowId));
		}
	};

	const handleSelectAll = event => {
		if (event.target.checked) {
			// Select all checkboxes
			const allRowIds = [];
			expRecords.forEach(record => {
				allRowIds.push(record.id)
			})
			setSelectedRows(allRowIds);
		} else {
			// Deselect all checkboxes
			setSelectedRows([]);
		}
	};

	const handleDeleteMultiple = (rows) => {
		rows.forEach(id => {
			handleDelete(id)
		})
		setSelectedRows([])
	}



	return (
		<div className="container">
			<h1>Expense Records</h1>
			<div className="d-flex row mx-1">
				<button className="btn btn-primary mb-3 col-2">
					<Link to="/records/create" style={{ color: 'white', textDecoration: 'none'}}>Create Expense</Link>
				</button>
				<div className="col-2">
					<Months handleOnChange={handleMonthsChange}/>
				</div>
				<div className="col-2">
					<Years handleOnChange={handleYearsChange}/>
				</div>
				<div className="col-2">
					<Categories handleOnChange={handleCategoryChange}/>
				</div>
			</div>
			{
				filteredRecords && filteredRecords.length > 0
					? (<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">
										<input className="form-check-input"
											   type="checkbox"
											   value=""
											   id="flexCheckDefault"
											   onChange={handleSelectAll}
											   checked={selectedRows.length === filteredRecords.length}
										/>
									</th>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col"
										onClick={sortByDate}
										style={{cursor: 'pointer'}}>Date</th>
									<th scope="col"
										onClick={sortByAmount}
										style={{cursor: 'pointer'}}>Amount</th>
									<th scope="col">Category</th>
									<th scope="col">Type</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{filteredRecords.map((record, index) => {
									const rowClassName = record.type === ExpenseType.EXPENSE ? 'expense-row' : 'income-row';
									return (
										<tr key={index}>
											<td>
												<input className="form-check-input"
													   type="checkbox"
													   id="flexCheckDefault"
													   onChange={event => handleCheckboxChange(event, record.id)}
													   checked={selectedRows.includes(record.id)}/>
											</td>
											<th scope="row">{index + 1}</th>
											<td>{record.name}</td>
											<td>{moment(record.date).format('DD-MM-YYYY')}</td>
											<td>{record.amount.toLocaleString()}</td>
											<td>{record.categories[0].name}</td>
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

												<button className="btn btn-outline-danger mx-1" 
													onClick={() => handleDelete(record.id)}>
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
						{
							selectedRows.length > 0
								? (<div className="mb-3">
									Do you want to delete {selectedRows.length === expRecords.length ? 'all' : selectedRows.length} {selectedRows.length > 1 ? 'items' : 'item'}?
									<button className="mx-2 btn btn-outline-danger" 
										onClick={() => handleDeleteMultiple(selectedRows)}>
										Delete
									</button>
								</div>)
								: (<></>)
						}
						<UploadCSV onUpload={handleUpload}/>
					</div>)
					: (<p> There is no data for displaying! </p>)
			}
		</div>
	);
};

export default RecordPage;
