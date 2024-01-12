import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Modal({ isModalOpen, setIsModalOpen, contacts, setFilter }) {
	const [contact, setContact] = useState(null)
	const [isEven, setIsEven] = useState(false)
	const navigate = useNavigate()

	return (
		<>
			<div className={`${isModalOpen || contact ? 'show fade modal-backdrop' : ''}`}></div>

			<div
				className={`modal ${isModalOpen ? 'show' : ''}`}
				style={{ display: isModalOpen ? 'block' : 'none' }}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<button
								className='btn'
								style={{
									backgroundColor: '#46139f',
									color: 'white'
								}}
								type='button'
								onClick={() => {
									setFilter('all')
									navigate('?filter=all')
								}}>
								All Contacts
							</button>
							<button
								className='btn'
								style={{
									backgroundColor: '#ff7f50',
									color: 'white'
								}}
								type='button'
								onClick={() => {
									setFilter('us')
									navigate('?filter=us')
								}}>
								US Contacts
							</button>
							<button
								className='btn'
								style={{
									backgroundColor: '#46139f',
									border: '5px inset #46139f',
									color: 'white'
								}}
								type='button'
								onClick={() => {
									setIsModalOpen(prev => !prev)
									navigate('')
								}}>
								Close
							</button>
						</div>

						<div className='modal-body'>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th scope='col'>ID</th>
										<th scope='col'>Name</th>
										<th scope='col'>Country</th>
									</tr>
								</thead>

								<tbody>
									{contacts
										?.filter(contact => {
											if (isEven) {
												return contact.id % 2 === 0
											}
											return contact
										})
										?.map(contact => (
											<tr
												style={{
													cursor: 'pointer'
												}}
												key={contact.id}
												onClick={() => {
													setContact(contact)
													setIsModalOpen(false)
												}}>
												<td>{contact?.id}</td>
												<td>{contact?.phone}</td>
												<td>{contact?.country?.name}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>

						<div className='modal-footer' style={{ display: 'block' }}>
							<input
								type='checkbox'
								id='isEven'
								name='isEven'
								onChange={e => setIsEven(e.target.checked)}
							/>
							<label htmlFor='isEven'>Only Even</label>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`modal ${contact ? 'show' : ''}`}
				style={{ display: contact ? 'block' : 'none' }}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-body'>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th scope='col'>ID</th>
										<th scope='col'>Name</th>
										<th scope='col'>Country</th>
									</tr>
								</thead>

								<tbody>
									<tr key={contact?.id}>
										<td>{contact?.id}</td>
										<td>{contact?.phone}</td>
										<td>{contact?.country?.name}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-secondary'
								type='button'
								onClick={() => setContact(null)}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
