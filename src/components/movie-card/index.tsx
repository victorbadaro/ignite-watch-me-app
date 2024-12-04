import { Clock, Star } from 'react-feather';

import './styles.scss';

interface MovieCardProps {
	title: string;
	poster: string;
	rating: string;
	runtime: string;
}

export function MovieCard({ title, poster, rating, runtime }: MovieCardProps) {
	return (
		<div className="movie-card">
			<img src={poster} alt={title} />

			<div>
				<div className="movie-info">
					<span>{title}</span>
					<div className="meta">
						<div>
							<Star /> {rating}
						</div>

						<div>
							<Clock /> {runtime}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
