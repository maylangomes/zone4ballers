import Cookies from 'js-cookie';

interface HandleLogoutProps {
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandleLogout = ({ setIsAdmin }: HandleLogoutProps) => {
  const handleLogout = () => {
    Cookies.remove('admin');
    localStorage.removeItem('username');
    setIsAdmin(false);
  };

  return (
    <button
      type="button"
      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default HandleLogout;
