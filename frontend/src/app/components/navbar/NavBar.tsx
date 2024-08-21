import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const articles = [
    'Article 1',
    'Article 2',
    'Article 3',
    'Another Article',
    'More Articles',
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filteredSuggestions = articles.filter(article =>
        article.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login" legacyBehavior>
            <a className={styles.navLink}>Login</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/signup" legacyBehavior>
            <a className={styles.navLink}>Signup</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                  <li key={index} className={styles.suggestionItem}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
