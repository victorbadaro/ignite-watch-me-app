import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { MovieCard } from '../movie-card';

import './styles.scss';

interface Rating {
	Source: string;
	Value: string;
}

interface Movie {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Rating[];
	Runtime: string;
}

export interface Genre {
	id: string;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface ContentProps {
	selectedGenreId: string;
}

export function Content({ selectedGenreId }: ContentProps) {
	const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		api.get<Movie[]>(`/movies?Genre_id=${selectedGenreId}`).then((response) => setMovies(response.data));
		api.get<Genre>(`/genres/${selectedGenreId}`).then((response) => setSelectedGenre(response.data));
	}, [selectedGenreId]);

	return (
		<div className="container">
			<header>
				<span className="category">
					Categoria: <span>{selectedGenre.title}</span>
				</span>
			</header>

			<main>
				<div className="movies-list">
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
					))}
				</div>
			</main>
		</div>
	);
}
