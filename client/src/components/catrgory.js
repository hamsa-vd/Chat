import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
function Category() {
	const [ loading, setLoading ] = useState(true);
	const { category } = useParams();
	console.log(category);
	return (
		<div className="category-parent" style={{ height: '200vh' }}>
			{[ 'room', 'friend' ].indexOf(category) == -1 && toast.error('invalid url') && <Redirect to="/chat" />}
			{loading && <ReactLoading className="loading mt-5" type="bubbles" color="black" />}
		</div>
	);
}

export default Category;
