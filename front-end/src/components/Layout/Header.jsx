// src/components/Layout/Header.jsx
import Button from '../UI/Button.jsx';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 bg-card-bg shadow-sm p-4 md:p-6 flex justify-between items-center">
      
      <Button 
        onClick={toggleSidebar} 
        variant="ghost" 
        className="md:hidden p-2 text-text-dark"
      >
        <i className="fas fa-bars text-xl" />
      </Button>

      <div className="flex-1 max-w-lg hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users, reports, or ads..."
            className="w-full pl-10 pr-4 py-2 border border-background-light rounded-card focus:ring-primary focus:border-primary transition duration-150"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <i className="fas fa-bell text-xl text-text-muted cursor-pointer hover:text-primary transition" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent border-2 border-card-bg" />
        </div>
        
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg" // Placeholder
            alt="Admin"
            className="h-10 w-10 rounded-full object-cover border-2 border-primary"
          />
          <span className="hidden sm:inline text-text-dark font-medium">Super Admin</span>
          <i className="fas fa-chevron-down text-xs text-text-muted hidden sm:inline" />
        </div>
      </div>
    </header>
  );
};

export default Header;