import React from 'react';

const Years = ({handleOnChange}) => {
	const startYear = 1970;
	const endYear = 2024;
	const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
	const handleChange = (e) => {
		handleOnChange(e.target.value)
	}
	return (
		<select className="form-select"
			aria-label="Default select example"
			onChange={handleChange}>
			<option value="">Years</option>
			{years.map((year) => (
				<option key={year} value={year}>
					{year}
				</option>
			))}
		</select>
	)
}
export default Years
