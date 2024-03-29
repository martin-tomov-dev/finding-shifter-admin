import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/app.css';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
