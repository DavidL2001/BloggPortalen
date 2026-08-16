import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { updateProfile, removeAvatar } from '../api/auth';
import '../styles/_dashboard-layout.scss';

export default function Dashboard() {
  const { user, token, logout, updateUser } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username ?? '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return null;
  }

  const initials = user.username
    .split(' ')
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join('');

  const startEditing = () => {
    setUsername(user.username);
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setError(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!token) return;

    setIsSaving(true);
    setError(null);

    try {
      const updates: { username?: string; avatar?: File } = {};

      if (username.trim() && username !== user.username) {
        updates.username = username.trim();
      }
      if (avatarFile) {
        updates.avatar = avatarFile;
      }

      const updated = await updateProfile(token, updates);

      updateUser({
        username: updated.username,
        avatar: updated.avatar,
        bio: updated.bio,
      });

      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte spara ändringarna');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!token) return;

    setIsSaving(true);
    setError(null);

    try {
      const updated = await removeAvatar(token);
      updateUser({ avatar: updated.avatar });
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ta bort profilbilden');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="dashboard-layout__content" role="main">
      <section className="profile">
        <div className="profile__header">
          <div className="profile__avatar" title={user.username}>
  {user.avatar ? (
    <img
      src={`http://localhost:5000${user.avatar}`}
      alt={user.username}
      className="profile__avatar-img"
    />
  ) : (
    initials
  )}
</div>

          <div className="profile__info">
            <h1 className="profile__name">{user.username}</h1>
          </div>
        </div>

        {isProfilePage && !isEditing && (
          <>
            <div className="profile__details">
              <div className="profile__field">
                <label className="profile__field-label">E-postadress</label>
                <p className="profile__field-value">{user.email}</p>
              </div>

              <div className="profile__field">
                <label className="profile__field-label">Medlemsroll</label>
                <p className="profile__field-value">
                  {user.role === 'admin' ? 'Administratör' : 'Vanlig användare'}
                </p>
              </div>

              {user.bio && (
                <div className="profile__field">
                  <label className="profile__field-label">Biografi</label>
                  <p className="profile__field-value">{user.bio}</p>
                </div>
              )}

              <div className="profile__field">
                <label className="profile__field-label">Konto-ID</label>
                <p className="profile__field-value" style={{ fontSize: '12px' }}>
                  {user._id}
                </p>
              </div>
            </div>

            <div className="profile__actions">
              <button
                type="button"
                className="profile__edit-btn"
                onClick={startEditing}
              >
                Redigera profil
              </button>
              <button
                type="button"
                className="profile__logout-btn"
                onClick={logout}
              >
                Logga ut
              </button>
            </div>
          </>
        )}

        {isProfilePage && isEditing && (
          <div className="profile__edit-form">
            {error && <p className="profile__error">{error}</p>}

            <div className="profile__field">
              <label className="profile__field-label" htmlFor="username-input">
                Användarnamn
              </label>
              <input
                id="username-input"
                type="text"
                className="profile__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                maxLength={30}
              />
            </div>

            <div className="profile__field">
              <label className="profile__field-label">Profilbild</label>

              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Förhandsvisning av ny profilbild"
                  className="profile__avatar-preview"
                />
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="profile__file-input"
              />

              {user.avatar && !avatarFile && (
                <button
                  type="button"
                  className="profile__remove-avatar-btn"
                  onClick={handleRemoveAvatar}
                  disabled={isSaving}
                >
                  Ta bort nuvarande profilbild
                </button>
              )}
            </div>

            <div className="profile__actions">
              <button
                type="button"
                className="profile__edit-btn"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Sparar...' : 'Spara'}
              </button>
              <button
                type="button"
                className="profile__cancel-btn"
                onClick={cancelEditing}
                disabled={isSaving}
              >
                Avbryt
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
