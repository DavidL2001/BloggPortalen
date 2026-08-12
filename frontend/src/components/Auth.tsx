import { useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { login, register } from '../api/auth';

export default function Auth() {
  const { login: authLogin } = useAuth();

  const { loading, error: fetchError } = useFetch();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // usecallback för att inte skapa ny handlesubmit på varje render..
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');

      try {
        let result;

        if (mode === 'register') {
          result = await register(username, email, password);
        } else {
          result = await login(email, password);
        }

        // Spara i context och localstorage
        authLogin(
          {
            _id: result._id,
            username: result.username,
            email: result.email,
            avatar: result.avatar,
            bio: result.bio,
            role: result.role,
          },
          result.token
        );
      } catch (err: any) {
        setError(err.message || 'Något gick fel');
      }
    },
    [mode, username, email, password, authLogin]
  );

  const handleToggleMode = useCallback(() => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
  }, [mode]);

  return (
    <div role="main" aria-labelledby="auth-title">
      <h1 id="auth-title">
        {mode === 'login' ? 'Logga in' : 'Registrera'}
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        {mode === 'register' && (
          <div>
            <label htmlFor="username">
              Användarnamn <span aria-label="obligatoriskt fält">*</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Anna Andersson"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              aria-required="true"
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>
        )}

        <div>
          <label htmlFor="email">
            E-post <span aria-label="obligatoriskt fält">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="namn@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-describedby={error ? 'error-message' : undefined}
          />
        </div>

        <div>
          <label htmlFor="password">
            Lösenord <span aria-label="obligatoriskt fält">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Minst 6 tecken"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            required
            minLength={6}
            aria-required="true"
            aria-describedby={error ? 'error-message' : undefined}
          />
        </div>

        {(error || fetchError) && (

          <div
            id="error-message"
            role="alert"
            aria-live="polite"
            style={{ color: '#d32f2f', marginBottom: '1rem' }}
          >
            {error || fetchError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}

        >
          {loading
            ? 'Bearbetar...'
            : mode === 'login'
              ? 'Logga in'
              : 'Skapa konto'}
        </button>
      </form>

      <button
        onClick={handleToggleMode}

        type="button"
        aria-label={
          mode === 'login'
            ? 'Gå till registreringssida'
            : 'Gå till inloggningssida'
        }
        style={{ marginTop: '1rem' }}
      >
        {mode === 'login'
          ? 'Har inget konto? Registrera dig'

          : 'Har redan konto? Logga in'}
      </button>
    </div>
  );
}
