import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/actionTypes';

const initialState = {
	surveys: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return { ...state, surveys: action.payload };
		case DELETE_SURVEY:
			return { ...state, surveys: action.payload };
		default:
			return state;
	}
};
