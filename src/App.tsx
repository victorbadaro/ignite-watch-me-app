import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { api } from './services/api';

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

export function App() {
	const [selectedGenreId, setSelectedGenreId] = useState(1);
	const [genres, setGenres] = useState<GenreResponseProps[]>([]);

	useEffect(() => {
		api.get<GenreResponseProps[]>('genres').then((response) => {
			setGenres(response.data);
		});
	}, []);

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<SideBar
				genres={genres}
				selectedGenreId={selectedGenreId}
				handleClickButton={handleClickButton}
			/>
			<Content selectedGenreId={selectedGenreId} />
		</div>
	);
}
