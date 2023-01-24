import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const View = () => {
	const [user, setUser] = useState({});
	const { id } = useParams();
	useEffect(() => {
		axios.get(`https://benlarbi-app.herokuapp.com/api/get/${id}`).then((resp) => {
			setUser({ ...resp.data[0] });
		});
	}, [id]);
    console.log(user);
	return (
		<div className="container " >
			<div className="row mt-5">
				<div className="col-sm-3"></div>
				<div className="col-sm-6">
					<table className="table table-bordered border-primary table-striped text-center">
						<thead>
							<tr className="table-dark text-white ">
								<th colSpan={2}> User Contact Details</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>ID :</th>
								<td>{id}</td>
							</tr>
							<tr>
								<th>Name :</th>
								<td>{user.nom}</td>
							</tr>
							<tr>
								<th>Email :</th>
								<td>{user.email}</td>
							</tr>
							<tr>
								<th>Contact :</th>
								<td>{user.contact}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-sm-3"></div>
			</div>
		</div>
	);
};

export default View;
