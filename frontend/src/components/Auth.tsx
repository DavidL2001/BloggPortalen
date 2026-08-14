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
    <div className="auth" role="main" aria-labelledby="auth-title">
      <div className="auth__container">
        <div className="auth__header">
          <h1 id="auth-title">
            {mode === 'login' ? 'Logga in' : 'Registrera dig'}
          </h1>
          <p>
            {mode === 'login'
              ? 'Välkommen tillbaka till BloggPortalen'
              : 'Skapa ett nytt konto och börja blogga'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="auth__form">
          {mode === 'register' && (
            <div
              className={`auth__form-group ${error ? 'error' : ''}`}
              key="username-field"
            >
              <label htmlFor="username">
                Användarnamn <span className="required">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Din användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                aria-required="true"
                aria-describedby={error ? 'error-message' : undefined}
              />
            </div>
          )}

          <div className="auth__form-group">
            <label htmlFor="email">
              E-post <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="din@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          <div className="auth__form-group">
            <label htmlFor="password">
              Lösenord <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder={mode === 'register' ? 'Minst 6 tecken' : 'Ditt lösenord'}
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
              className="auth__error"
              role="alert"
              aria-live="polite"
            >
              <span>⚠️</span>
              <span>{error || fetchError}</span>
            </div>
          )}

          <button
            type="submit"
            className="auth__button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="auth__loading" />
                <span className="auth__loading" />
                <span className="auth__loading" />
              </>
            ) : mode === 'login' ? (
              'Logga in'
            ) : (
              'Skapa konto'
            )}
          </button>
        </form>

        <div className="auth__toggle">
          <span>
            {mode === 'login' ? 'Ingen konto ännu?' : 'Har redan konto?'}
          </span>
          <button
            type="button"
            onClick={handleToggleMode}
            aria-label={
              mode === 'login'
                ? 'Gå till registreringssida'
                : 'Gå till inloggningssida'
            }
          >
            {mode === 'login' ? 'Registrera dig här' : 'Logga in här'}
          </button>
        </div>
      </div>
    </div>
  );
}
