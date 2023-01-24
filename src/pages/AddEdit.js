import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { toast } from 'react-toastify';
const initialState = {
	nom: '',
	email: '',
	contact: '',
};
const AddEdit = () => {
	const [state, setState] = useState(initialState);
	const { nom, email, contact } = state;
	const navigate = useNavigate();
	const { id } = useParams();
	useEffect(() => {
		axios
			.get(`https://benlarbi-app.herokuapp.com/api/get/${id}`)
			.then((res) => setState({ ...res.data[0] }));
	}, [id]);
	function HandleInputChange(e) {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	}
	function HandleSubmit(e) {
		e.preventDefault();
		if (!nom || !email || !contact) {
			toast.error('tous les champs sont obligatoires ');
		} else {
			if (!id) {
				axios
					.post('https://benlarbi-app.herokuapp.com/api/post', {
						nom,
						email,
						contact,
					})
					.then(() => {
						setState({ nom: '', email: '', contact: '' });
					})
					.catch((err) => toast.error(err.response.data));
				toast.success('Stagiaire added succesfully');
			} else {
				axios
					.put(`https://benlarbi-app.herokuapp.com/api/update/${id}`, {
						nom,
						email,
						contact,
					})
					.then(() => {
						setState({ nom: '', email: '', contact: '' });
					})
					.catch((err) => toast.error(err.response.data));
				toast.success('Stagiaire added succesfully');
			}
			setTimeout(() => navigate('/'), 500);
		}
	}
	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-4"></div>
				<div className="col-4 "></div>
				<div className="col-4"></div>
			</div>
			<form className="m-auto p-2 text-center" onSubmit={HandleSubmit}>
				<div className="row">
					<div className="col"></div>
					<div className="col-4 ">
						<label htmlFor="nom" className="pb-3">
							Nom
						</label>
						<input
							type="text"
							className="form-control"
							name="nom"
							id="nom"
							placeholder="Your Name ...."
							onChange={HandleInputChange}
							value={nom || ''}
						/>
					</div>
					<div className="col-4"></div>
				</div>
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4">
						<label htmlFor="email" className="pb-3">
							email{' '}
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Your email ...."
							onChange={HandleInputChange}
							name="email"
							id="email"
							value={email || ''}
						/>
					</div>
					<div className="col-4"></div>
				</div>
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4">
						<label htmlFor="contact" className="pb-3">
							contact{' '}
						</label>
						<input
							type="number"
							className="form-control"
							placeholder="Your contact ...."
							onChange={HandleInputChange}
							name="contact"
							id="contact"
							value={contact || ''}
						/>
					</div>
					<div className="col-4"></div>
				</div>
				<br />
				<div className="row">
					<div className="col">
						<Stack gap={2} className="col-sm-4 mx-auto">
							<button className="btn btn-success" type="submit">
								{id ? 'Update' : 'Save'}
							</button>
							<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
								<button style={{ width: '100%' }} className="btn btn-dark">
									Go back
								</button>
							</Link>
						</Stack>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEdit;
