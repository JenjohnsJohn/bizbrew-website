import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderOpen, Plus, LogOut, ArrowLeft } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { to: '/admin/projects/new', label: 'Add Project', icon: Plus },
];

export default function AdminLayout() {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bizbrew-charcoal flex items-center justify-center">
        <div className="text-bizbrew-text-secondary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-bizbrew-charcoal">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-bizbrew-text-secondary hover:text-bizbrew-offwhite transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-display font-bold text-bizbrew-offwhite text-lg">
              BizBrew Admin
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.to === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-bizbrew-amber/10 text-bizbrew-amber'
                      : 'text-bizbrew-text-secondary hover:text-bizbrew-offwhite hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="text-bizbrew-text-secondary hover:text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Mobile nav */}
        <nav className="flex md:hidden items-center gap-1 px-6 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const isActive =
              item.to === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-bizbrew-amber/10 text-bizbrew-amber'
                    : 'text-bizbrew-text-secondary hover:text-bizbrew-offwhite hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
