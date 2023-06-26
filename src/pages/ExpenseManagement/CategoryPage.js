import React, { useEffect, useState } from 'react';
import { API_SERVICE } from '../../constants/api.const';
import {Link} from 'react-router-dom';


const CategoryPage = () => {
	const [categorys, setCategorys] = useState(null);
	
	useEffect(() =>{
		getAllCategory()
	},[])
	
	const getAllCategory = async () => {
		const res = await API_SERVICE.Categories.getAll()
		setCategorys(res.content);
	}
	
	const handleDelete = async (id) =>{
		try{
			await API_SERVICE.Categories.delete(id)
			await getAllCategory()
		}
		catch (e) {
			console.log(e.message)
		}		
	}
	return (
		<div className="container">
			<h1>Categories</h1>
			<button className="btn btn-primary mb-3 col-2">
				<Link to="/create-category" style={{ color: 'white', textDecoration: 'none'}}>Create Categorie</Link>
			</button>
			{
				categorys && categorys.length > 0
					?(<div>
						<table className="table">
							<thead>
								<tr>									
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Description</th>									
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{categorys.map((category, index) => {

									return (
										<tr key= {index}>
											
											<th scope="row">{index + 1}</th>
											<td>
											{/* <div dangerouslySetInnerHTML={{__html:category.name}}></div> */}
											{category.name}
											</td>
											<td>{category.description}</td>
											
											<td>
												
												<Link to={`/update-category/${category.id}`} style={{ textDecoration: 'none'}}>
													<button className="btn btn-outline-primary mx-1">
													Edit
													</button>
												</Link>

												<button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(category.id)}>
												Delete
												</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>)
					: (<p> There is no data for displaying! </p>)
			}
		</div>
	);
};

export default CategoryPage;


