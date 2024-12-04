import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Button } from '../button';
import type { Genre } from '../content';
import { Icon } from '../icon';

import './styles.scss';

interface SidebarProps {
	selectedGenreId: string;
	handleClickButton: (id: string) => void;
}

export function Sidebar({ selectedGenreId, handleClickButton }: SidebarProps) {
	const [genres, setGenres] = useState<Genre[]>([]);

	useEffect(() => {
		api.get('/genres').then((response) => setGenres(response.data));
	}, []);

	return (
		<nav className="sidebar">
			<span>
				Watch <p>Me</p>
			</span>

			<div className="buttons-container">
				{genres.map((genre) => (
					<Button key={genre.id} type="button" onClick={() => handleClickButton(genre.id)} selected={genre.id === selectedGenreId}>
						<Icon name={genre.name} color={genre.id === selectedGenreId ? '#FAE800' : '#FBFBFB'} />
						{genre.title}
					</Button>
				))}
			</div>
		</nav>
	);
}
