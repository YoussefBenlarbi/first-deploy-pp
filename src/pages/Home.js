import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Home.css';
// import { toast } from 'react-toastify';
import axios from 'axios';
const Home = () => {
	const [data, setData] = useState([]);
	const loadData = async () => {
		const response = await axios.get('https://benlarbi-app.herokuapp.com/api/get');
        setData(response.data)
	};
    useEffect(()=>{
        loadData();
    },[])
    console.log(data);
	return <div>Home</div>;
};

export default Home;
