import React from 'react'
import moment from 'moment';
const UploadCSV = ({onUpload}) => {
	const handleUpload = (e) => {
		e.preventDefault()
		if (!e.target[0].files[0]) return;
		if (!validateExtension(e.target[0].files[0].type)) return

		const file = e.target[0].files[0];
		const reader = new FileReader();

		try {
			reader.onload = function (e) {
				let contents = e.target.result;
				let lines = contents.split('\n');
				let data = [];
				lines.forEach(function(line, index) {
					if (index === 0) return;
					data.push(row(line.split(',')));
				});
				onUpload(data);
			};
			reader.readAsText(file);
		} catch (e) {
			console.log(e)
		}
	}

	const row = (inputArray) => {
		return {
			name: inputArray[0],
			amount: Number.parseInt(inputArray[1]),
			type: inputArray[2].toUpperCase(),
			categories: inputArray[3],
			date: moment(Date.parse(inputArray[4])).format('YYYY-MM-DD'),
			note: inputArray[5].replaceAll('\r', ''),
		}
	}

	const validateExtension = (type) => {
		const fileType = 'text/csv'
		return type === fileType
	}

	return (
		<div>
			<form onSubmit={handleUpload}>
				<input type="file"/>
				<button className="btn btn-outline-primary">Upload</button>
			</form>
		</div>
	)
}

export default UploadCSV
