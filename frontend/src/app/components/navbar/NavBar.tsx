import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NavBar.module.css';
import HandleLogout from '../handleLogout/page';

const NavBar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);


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
      const filteredSuggestions = articles.filter((article) =>
        article.toLowerCase().includes(query.toLowerCase()),
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
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => router.push('/')}
          >
            Home
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => router.push('/pages/login')}
          >
            Login
          </button>
        </li>
        <li className={styles.navItem}>
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => router.push('/pages/signup')}
          >
            Signup
          </button>
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
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
            <HandleLogout setIsAdmin={setIsAdmin} />
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
