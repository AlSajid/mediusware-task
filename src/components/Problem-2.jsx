import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

const Problem2 = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [filter, setFilter] = useState('all')
	const [contacts, setContacts] = useState([])
	const navigate = useNavigate()

	const getContacts = async url => {
		const res = await fetch(url)
		const data = await res.json()
		return data?.results
	}

	useEffect(() => {
		const fetchContacts = async () => {
			const contacts = await getContacts('https://contact.mediusware.com/api/contacts/')
			setContacts(contacts)
		}

		fetchContacts()
	}, [])

	useEffect(() => {
		const filterContacts = async () => {
			let filteredContacts = []

			switch (filter) {
				case 'all':
					filteredContacts = await getContacts('https://contact.mediusware.com/api/contacts/')
					break

				case 'us':
					filteredContacts = await getContacts(
						'https://contact.mediusware.com/api/country-contacts/United%20States/'
					)
					break
			}

			setContacts(filteredContacts)
		}

		filterContacts()
	}, [filter])

	return (
		<>
			<div className='container'>
				<div className='row justify-content-center mt-5'>
					<h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

					<div className='d-flex justify-content-center gap-3'>
						<button
							className='btn btn-lg btn-outline-primary'
							type='button'
							onClick={() => {
								setIsModalOpen(prev => !prev)
								setFilter('all')
								navigate('?filter=all')
							}}>
							All Contacts
						</button>
						<button
							className='btn btn-lg btn-outline-warning'
							type='button'
							onClick={() => {
								setIsModalOpen(prev => !prev)
								setFilter('us')
								navigate('?filter=us')
							}}>
							US Contacts
						</button>
					</div>
				</div>
			</div>

			<Modal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				contacts={contacts}
				setFilter={setFilter}
				setContacts={setContacts}
			/>
		</>
	)
}

export default Problem2
