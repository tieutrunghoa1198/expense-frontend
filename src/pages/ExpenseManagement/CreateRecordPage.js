import React, {useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {useNavigate} from 'react-router-dom';
import ExpenseRecord from '../../components/ExpenseRecord';

const CreateRecordPage = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const handleCreateRecord = async (e) => {
		setError('')
		e.categories = [e.categories]
		try {
			await API_SERVICE.Records.create(e)
			setError('Create successfully!')
			navigate('/records');
		} catch (e) {
			setError(e.message)
		}
	}

	return (
		<div className="container">
			<h1>Create Expense/Income Record</h1>
			<ExpenseRecord onSubmitClick={(e) => handleCreateRecord(e)}
						   action="create"/>
			{error && <div>{error}</div>}
		</div>
	);
};

export default CreateRecordPage;
