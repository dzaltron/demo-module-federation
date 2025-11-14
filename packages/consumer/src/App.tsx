import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';

registerRemotes([
  {
    name: 'providerA',
    entry: 'http://localhost:3001/mf-manifest.json',
  },
  {
    name: 'providerB',
    entry: 'http://localhost:3002/mf-manifest.json',
  },
]);

const ProviderA = createRemoteAppComponent({
  loader: () => loadRemote('providerA/app'),
  loading: <div>Loading Provider A...</div>,
  fallback: ({ error }) => (
    <div>
      <h2>Error loading Provider A</h2>
      <p>{error?.message}</p>
    </div>
  ),
});

const ProviderB = createRemoteAppComponent({
  loader: () => loadRemote('providerB/app'),
  loading: <div>Loading Provider B...</div>,
  fallback: ({ error }) => (
    <div>
      <h2>Error loading Provider B</h2>
      <p>{error?.message}</p>
    </div>
  ),
});

function Home() {
  return (
    <div>
      <p>Welcome to Module Federation Demo</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/provider-a">Provider A</Link>
          </li>
          <li>
            <Link to="/provider-b">Provider B</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-a/*" element={<ProviderA />} />
        <Route path="/provider-b/*" element={<ProviderB />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
