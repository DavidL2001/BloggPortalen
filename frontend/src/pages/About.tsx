import { useState } from "react";
import "../styles/_about.scss";

export default function About() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="about" role="main">
      <section className="about__hero">
        <p className="about__eyebrow">Om BloggPortalen</p>

        <h1>En plats för tankar, idéer och berättelser.</h1>

        <p className="about__intro">
          Vi på BloggPortalen vet att alla har något att berätta. Därför har vi
          skapat en plattform där man kan skapa, dela och upptäcka innehåll inom
          olika ämnen. Här kan du hitta nya perspektiv, dela med dig av dina
          egna intressen och åsikter genom att kommentera och gilla.
        </p>
      </section>

      <section className="about__content" aria-labelledby="about-heading">
        <div className="about__text">
          <p className="about__eyebrow">Vilka är vi?</p>

          <h2 id="about-heading">Personerna bakom BloggPortalen</h2>

          <div className="about__team">
            <article className="about__person">
              <h3>David</h3>
              <p className="about__person-role">Fullstack-utvecklare</p>
              <p>Ogillar ananas på pizza.</p>
            </article>

            <article className="about__person">
              <h3>Jesper</h3>
              <p className="about__person-role">Frontend-utvecklare</p>
              <p>Gillar ananas på pizza.</p>
            </article>

            <article className="about__person">
              <h3>Katrina</h3>
              <p className="about__person-role">Backend-utvecklare</p>
              <p>Älskar banan på pizza.</p>
            </article>
          </div>

          <p className="about__team-intro">
            Tillsammans har vi skapat BloggPortalen med målet att göra det
            enkelt att läsa, skapa och dela innehåll inom olika ämnen.
          </p>

          <p>
            Oavsett om du vill skriva om programmering, fotografi, resor, gaming
            eller något helt annat finns det en plats för dig här.
          </p>
        </div>

        <div className="about__features" aria-label="BloggPortalens funktioner">
          <div className="about__feature">
            <span aria-hidden="true">✍️</span>
            <h3>Skapa</h3>
            <p>Dela dina egna tankar och berättelser.</p>
          </div>

          <div className="about__feature">
            <span aria-hidden="true">🔎</span>
            <h3>Upptäck</h3>
            <p>Hitta innehåll inom ämnen som intresserar dig.</p>
          </div>

          <div className="about__feature">
            <span aria-hidden="true">💬</span>
            <h3>Interagera</h3>
            <p>Kommentera och gilla inlägg från andra användare.</p>
          </div>
        </div>
      </section>

      {/* Kontakt meddelanden sparas inte utan skickar bara ett bekräftelse meddelande */}
      <section className="about__contact" aria-labelledby="contact-heading">
        <div>
          <p className="about__eyebrow">Kontakt</p>

          <h2 id="contact-heading">Kontakta oss</h2>

          <p>
            Har du frågor, synpunkter eller vill komma i kontakt med oss? Skicka
            gärna ett meddelande.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label htmlFor="contact-name">Namn</label>

            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-email">E-post</label>

            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-message">Meddelande</label>

            <textarea id="contact-message" name="message" rows={5} required />
          </div>

          <button type="submit">Skicka meddelande</button>
        </form>

        {messageSent && (
          <div
            className="contact-form__success"
            role="status"
            aria-live="polite"
          >
            <p>Tack för ditt meddelande!</p>

            <button type="button" onClick={() => setMessageSent(false)}>
              Stäng
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
