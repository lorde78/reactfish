import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { UserAuth } from '../context/AuthContext';
import { useCollections } from '../context/CollectionContext';

const ItemType = 'fiche';

const Fish = ({ collection }) => {
	const { user } = UserAuth();
	const { addFiche, deleteFiche, moveFiche } = useCollections();
	const [ficheTitle, setFicheTitle] = useState('');

	const [, drop] = useDrop({
		accept: ItemType,
		drop: (item, monitor) => {
			if (!monitor.didDrop() && item.originCollectionId !== collection.id) {
				moveFiche(user.uid, item.originCollectionId, collection.id, item.id);
			}
		}
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
	const { deleteFiche } = useCollections();

	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { id: fiche.id, originCollectionId },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<li ref={drag} className={`mb-2 p-2 bg-gray-600 rounded flex justify-between ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
			<span>{fiche.title}</span>
			<button onClick={() => deleteFiche(user.uid, originCollectionId, fiche.id)} className='border rounded-full bg-gray-500 hover:bg-gray-700 text-white px-2'>-</button>
		</li>
	);
};

export default Fish;
