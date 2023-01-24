import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
// import Modal from './Modal';
const Home = () => {
	const [data, seData] = useState([]);
	// const [modalOpen, setModalOpen] = useState(false);
	const loadData = async () => {
		const response = await axios.get('https://benlarbi-app.herokuapp.com/api/get');

		seData(response.data);
	};
	useEffect(() => {
		loadData();
	}, []);
	const deleteStagiaire = (id) => {
		if (window.confirm('Are you sure yoi want to delete trainee ?')) {
			axios.delete(`https://benlarbi-app.herokuapp.com/api/remove/${id}`);
			toast.success('stagiaire is deleted succesfully .');
			setTimeout(() => loadData(), 500);
		} else {
			toast.error('operation failed');
		}
	};
	return (
		<div className="container-fluid" style={{ marginTop: '150px' }}>
		
			<div className="row">
				<div className="col-lg-2"></div>
				<div className="col-lg-8">
					<h2>Home Page :</h2>{' '}
					<div class="table-responsive">
						<Table responsive="sm" className="table table-bordered border-dark table-striped text-center">
							<thead>
								<tr
									className="border-dark text-center"
									style={{ backgroundColor: '#009879' }}
								>
									<th>No :</th>
									<th>Nom :</th>
									<th>Email :</th>
									<th>Contact :</th>
									<th>Action :</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={item.id}>
											<th scope="row">{index + 1}</th>
											<td>{item.nom}</td>
											<td>{item.email}</td>
											<td>{item.contact}</td>
											<td>
												<Link to={`/update/${item.id}`}>
													<button className="btn btn-dark">Edit</button>
												</Link>
												<button
													className="btn btn-danger "
													onClick={() => deleteStagiaire(item.id)}
												>
													Delete
												</button>
												<Link to={`/view/${item.id}`}>
													<button className="btn btn-secondary">view</button>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<Link to="/addStagiaire">
						<button className="btn btn-dark">Add Stagiaire</button>
					</Link>
					
				</div>
				<div className="col-lg-2"></div>
			</div>
			{/* <div className="row">
				<div className="col">
				<button
						className="openModalBtn"
						onClick={() => {
							setModalOpen(true);
						}}
					>
						Open
					</button>
			{modalOpen && <Modal setOpenModal={setModalOpen} />}
				</div>
			</div> */}
		</div>
	);
};

export default Home;
	
			