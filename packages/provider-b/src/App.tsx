import { BrowserRouter, Routes, Route, Link } from 'react-router';

function Home() {
  return (
    <div>
      <h1>Provider B</h1>
      <nav>
        <ul>
          <li>
            <Link to="/details">Go to Details</Link>
          </li>
          <li>
            <Link to="/provider-a">Go to provider A</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Details() {
  return (
    <div>
      <h1>Provider B - Details Page</h1>
      <nav>
        <Link to="/">← Back</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
