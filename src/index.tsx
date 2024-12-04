import { createRoot } from 'react-dom/client';
import { App } from './app';

import './styles/index.scss';

const container = document.getElementById('root');

createRoot(container!).render(<App />);
