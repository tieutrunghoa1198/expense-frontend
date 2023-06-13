import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {API_SERVICE} from '../../constants/api.const';
import ExpenseRecord from '../../components/ExpenseRecord';
import moment from 'moment';

const UpdateRecordPage = () => {
	const { id } = useParams()
	const convertedId = Number.parseInt(id)
	const [data, setData] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		getRecordById(convertedId);
	}, [])

	const getRecordById = async (id) => {
		try {
			const res = await API_SERVICE.Records.getOne(id);
			res.categories = res.categories[0].id
			res.date = moment(res.date).format('YYYY-MM-DD')
			setData(res)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (input) => {
		input.categories = [input.categories]
		try {
			await API_SERVICE.Records.update(convertedId, input);
			navigate('/records');
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="container">
			<h1>Update Expense/Income Record</h1>
			{
				data
					? (<ExpenseRecord onSubmitClick={(input) => handleSubmit(input)}
								  action="update"
								  initialObj={data}/>)
					: (<div>Waiting for data...</div>)
			}

		</div>
	);
};

export default UpdateRecordPage;
