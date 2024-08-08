const HandleLogout = ({ setIsAdmin }: { setIsAdmin: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/controllers/logoutController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsAdmin(false);
        localStorage.removeItem('username');
        console.log('Logout successful');
      } else {
        console.error('Error during logout:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout fetch:', error);
    }
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