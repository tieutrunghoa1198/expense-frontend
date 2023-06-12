import React, {useEffect, useState} from 'react';
import {API_SERVICE} from '../../constants/api.const';
import {useParams} from 'react-router-dom';

const DetailRecordPage = () => {
	const { id } = useParams()
	const [data, setData] = useState(null);
	const getOneRecord = async () => {
		try {
			const recordId = Number.parseInt(id)
			const res = await API_SERVICE.Records.getOne(recordId)
			console.log(res)
			setData(res)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getOneRecord()
	}, [])

	return (
		<div className="container">
			<h1 className="text-capitalize">detail expense/income record</h1>
			{
				data
					? (<div>
						<span className="fw-bold">Name</span>: {data.name}
						<br/>
						<span className="fw-bold">Amount</span>: {data.amount}
						<br/>
						<span className="fw-bold">Type</span>: {data.type}
						<br/>
						<span className="fw-bold">Category</span>: {data.categories[0].name}
						<br/>
						<span className="fw-bold">Note</span>: {data.note}
						<br/>
					</div>)
					: (<div>Loading data...</div>)
			}
		</div>
	);
};

export default DetailRecordPage;
