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

interface Genre {
	id: string;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
	movies: Movie[];
}

interface ContentProps {
	selectedGenreId: string;
}

export function Content({ selectedGenreId }: ContentProps) {
	const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

	useEffect(() => {
		(async () => {
			const results = await Promise.all([api.get<Movie[]>(`/movies?Genre_id=${selectedGenreId}`), api.get<Genre>(`/genres/${selectedGenreId}`)]);
			const movies = results[0].data;

			setSelectedGenre({
				...results[1].data,
				movies
			});
		})();
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
					{selectedGenre.movies?.map((movie) => (
						<MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
					))}
				</div>
			</main>
		</div>
	);
}
