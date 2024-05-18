import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import UpdateFicheModal from './UpdateFicheModal';

const ItemType = 'fiche';

const Fish = ({ collection }) => {
	const { user } = UserAuth();
	const { addFiche, moveFiche } = useCollections();
	const [ficheTitle, setFicheTitle] = useState('');

	const [, drop] = useDrop({
		accept: ItemType,
		drop: (item, monitor) => {
			if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
				moveFiche(user.uid, item.originCollectionId, collection.id, item.id);
			}
		},
	});

	const handleFicheSubmit = async (e) => {
		e.preventDefault();
		if (user && ficheTitle) {
			await addFiche(user.uid, collection.id, ficheTitle);
			setFicheTitle('');
		}
	};

	return (
		<div ref={drop} className="mt-4">
			<form onSubmit={handleFicheSubmit}>
				<input
					type="text"
					value={ficheTitle}
					onChange={(e) => setFicheTitle(e.target.value)}
					placeholder="Enter fiche title"
					className="w-full p-2 text-black rounded"
				/>
				<button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3 block w-full">
					Add Fiche
				</button>
			</form>
			<ul className="mt-4">
				{collection.fiches.map((fiche) => (
					<FicheItem key={fiche.id} fiche={fiche} originCollectionId={collection.id} />
				))}
			</ul>
		</div>
	);
};

const FicheItem = ({ fiche, originCollectionId }) => {
	const { user } = UserAuth();
	const { deleteFiche, updateFiche } = useCollections();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { id: fiche.id, originCollectionId },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const handleUpdate = (newTitle) => {
		updateFiche(user.uid, originCollectionId, fiche.id, newTitle);
	};

	return (
		<li ref={drag} className={`mb-2 p-2 bg-gray-600 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
			<div className="flex items-center">
				<span className="mr-2">{fiche.title}</span>
				<button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
					<FiEdit className="text-lg" />
				</button>
			</div>
			<button onClick={() => deleteFiche(user.uid, originCollectionId, fiche.id)} className='border rounded-full p-1 bg-red-500 hover:bg-red-700 text-white'>
				<FiTrash2 className="text-lg" />
			</button>
			<UpdateFicheModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleUpdate}
				initialTitle={fiche.title}
			/>
		</li>
	);
};

export default Fish;
