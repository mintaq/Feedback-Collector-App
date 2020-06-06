import React from 'react';
import styles from './SurveyField.module.css'

const surveyField = ({ input, label, meta: { error, touched } }) => {
	return (
		<div className={styles.container}>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }}  placeholder={label}/>
			<div className="red-text" >
				{touched && error ? error : null}
			</div>
		</div>
	);
};

export default surveyField;
