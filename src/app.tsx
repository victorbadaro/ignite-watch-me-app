import { useState } from 'react';
import { Content } from './components/content';
import { Sidebar } from './components/sidebar';

export function App() {
	const [selectedGenreId, setSelectedGenreId] = useState('1');

	function handleClickButton(id: string) {
		setSelectedGenreId(id);
	}

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton} />
			<Content selectedGenreId={selectedGenreId} />
		</div>
	);
}