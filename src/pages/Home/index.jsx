import React, { useState } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Home() {
	const options = [...Array(10)].map((_, index) => (
		<option key={index} value={index + 1}>{index + 1}</option>
	));

	const students = ['Mahasiswa 1', 'Mahasiswa 2', 'Mahasiswa 3', 'Mahasiswa 4', 'Mahasiswa 5', 'Mahasiswa 6', 'Mahasiswa 7', 'Mahasiswa 8', 'Mahasiswa 9', 'Mahasiswa 10'];

	const [jsonData, setJsonData] = useState(null);

	const handleClick = () => {
		Swal.fire({
			title: 'Konfirmasi',
			html: '<p>Apakah Anda yakin ingin menyimpan data?</p>Data yang tidak diubah akan menjadi nol.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya',
			cancelButtonText: 'Batal',
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = {};
				[1, 2, 3, 4].forEach((aspect, aspectIndex) => {
					const aspectData = {};
					students.forEach((student, studentIndex) => {
						const value = document.getElementById(`input-${studentIndex}-${aspectIndex}`).value;
						aspectData[`mahasiswa_${studentIndex + 1}`] = value;
					});
					formData[`aspek_penilaian_${aspect}`] = aspectData;
				});
				const json = JSON.stringify(formData);
				setJsonData(json);
				console.log(json);

				Swal.fire({
					title: 'Data Tersimpan',
					text: 'Data telah disimpan.',
					icon: 'success',
					timer: 2000,
					showConfirmButton: false
				});
			}
		});
	};

	const getRandomAvatarUrl = () => {
		const randomNumber = Math.floor(Math.random() * 1249);
		return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomNumber}.jpg`;
	};

	return (
		<Container className="mt-2">
			<h3 className="mb-3">Aspek Penilaian Mahasiswa</h3>
			<Table striped bordered>
				<thead>
					<tr>
						<th>No</th>
						<th>Foto</th>
						<th>Nama</th>
						<th>Aspek Penilaian 1</th>
						<th>Aspek Penilaian 2</th>
						<th>Aspek Penilaian 3</th>
						<th>Aspek Penilaian 4</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, studentIndex) => (
						<tr key={studentIndex}>
							<th>{studentIndex + 1}</th>
							<th>
								<img style={{ width: 50, height: 50 }} src={getRandomAvatarUrl()} alt={`avatar_of_${student}`} />
							</th>
							<th style={{ width: 500 }} scope="row">{student}</th>
							{[1, 2, 3, 4].map((aspect, aspectIndex) => (
								<td key={aspectIndex}>
									<Form.Select id={`input-${studentIndex}-${aspectIndex}`}>
										<option value="0">...</option>
										{options}
									</Form.Select>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
			<div className="d-flex justify-content-end mb-5">
				<Button onClick={handleClick}>Simpan</Button>
			</div>
			{jsonData && (
				<div>
					<h4>JSON:</h4>
					<pre>{jsonData}</pre>
				</div>
			)}
		</Container>
	);
}
