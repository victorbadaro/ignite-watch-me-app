import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

import '../styles/content.scss';

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface MovieProps {
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

interface ContentProps {
	selectedGenreId: number;
}

export function Content(props: ContentProps) {
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
		{} as GenreResponseProps
	);
	const [movies, setMovies] = useState<MovieProps[]>([]);

	useEffect(() => {
		api
			.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`)
			.then((response) => {
				setMovies(response.data);
			});

		api
			.get<GenreResponseProps>(`genres/${props.selectedGenreId}`)
			.then((response) => {
				setSelectedGenre(response.data);
			});
	}, [props.selectedGenreId]);

	return (
		<div className="container">
			<header>
				<span className="category">
					Categoria:<span> {selectedGenre.title}</span>
				</span>
			</header>

			<main>
				<div className="movies-list">
					{movies.map((movie, index) => (
						<MovieCard
							key={`${movie.Title}-${index}`}
							title={movie.Title}
							poster={movie.Poster}
							runtime={movie.Runtime}
							rating={movie.Ratings[0].Value}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
