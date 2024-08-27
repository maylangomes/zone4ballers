import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NavBar.module.css';
import HandleLogout from '../handleLogout/page';
import { supabase } from '../../../../utils/supabase/client';

interface Article {
  id: string;
  name: string;
}

const NavBar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer les articles depuis Supabase
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('product')
        .select('id, name'); // Récupérer à la fois l'ID et le nom de l'article

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data || []); // Stockez les articles avec leurs ID et noms
      }
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filteredSuggestions = articles.filter((article) =>
        article.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Optionnel: Gérez la soumission du formulaire de recherche si nécessaire
  };

  const handleSuggestionClick = (id: string) => {
    // D'abord, réinitialiser l'ID sélectionné
    setSelectedId(null);
    
    // Ensuite, mettre à jour l'ID avec celui de l'article cliqué
    setSelectedId(id);
  };

  // useEffect pour rediriger une fois l'ID mis à jour
  useEffect(() => {
    if (selectedId) {
      router.push(`/pages/detailsProducts/${selectedId}`);
    }
  }, [selectedId, router]); // Déclenchement uniquement lorsque selectedId change

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
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion.id)}
                  >
                    {suggestion.name}
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