import React from 'react';

const surveyField = ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }}  placeholder={label}/>
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error ? error : null}
			</div>
		</div>
	);
};

export default surveyField;
