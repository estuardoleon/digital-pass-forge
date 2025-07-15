import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import PassCard from '@/components/PassCard';
import CreatePassForm from '@/components/CreatePassForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionData {
  email: string;
  role: 'admin' | 'user';
  loginTime: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'dashboard' | 'create'>('dashboard');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    const session = localStorage.getItem('passkit_session');
    if (!session) {
      navigate('/login');
      return;
    }

    try {
      const parsedSession = JSON.parse(session);
      setSessionData(parsedSession);
    } catch (error) {
      console.error('Invalid session data:', error);
      localStorage.removeItem('passkit_session');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('passkit_session');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  // Mock data for passes
  const mockPasses = [
    {
      id: '1',
      title: '20% Off Summer Sale',
      type: 'coupon',
      description: 'Save 20% on all summer items. Valid until end of July.',
      backgroundColor: '#FF6B6B',
      textColor: '#FFFFFF',
      createdAt: '2024-01-15',
      scans: 156,
      status: 'active' as const
    },
    {
      id: '2',
      title: 'VIP Loyalty Card',
      type: 'loyalty',
      description: 'Exclusive benefits for our VIP customers.',
      backgroundColor: '#4ECDC4',
      textColor: '#FFFFFF',
      createdAt: '2024-01-10',
      scans: 89,
      status: 'active' as const
    },
    {
      id: '3',
      title: 'Concert Ticket - Rock Festival',
      type: 'event',
      description: 'Access pass for the annual rock festival.',
      backgroundColor: '#45B7D1',
      textColor: '#FFFFFF',
      createdAt: '2024-01-05',
      scans: 234,
      status: 'expired' as const
    },
    {
      id: '4',
      title: 'Coffee Shop Punch Card',
      type: 'loyalty',
      description: 'Buy 9 coffees, get the 10th free!',
      backgroundColor: '#96CEB4',
      textColor: '#FFFFFF',
      createdAt: '2024-01-03',
      scans: 67,
      status: 'active' as const
    }
  ];

  if (!sessionData) {
    return null; // Loading state while checking authentication
  }

  if (currentView === 'create') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('dashboard')}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {sessionData.role === 'admin' ? 'Administrator' : 'User'}: {sessionData.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <CreatePassForm />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {sessionData.role === 'admin' ? 'Administrator' : 'User'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your digital passes and track their performance.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Logged in as: {sessionData.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search passes..."
              className="pl-10 glass-effect border-white/20"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-effect border-white/20">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={() => setCurrentView('create')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Pass
            </Button>
          </div>
        </div>

        {/* Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPasses.map((pass, index) => (
            <div key={pass.id} style={{ animationDelay: `${index * 100}ms` }}>
              <PassCard pass={pass} />
            </div>
          ))}
        </div>

        {/* Empty State for when no passes exist */}
        {mockPasses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Create your first pass
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first digital pass. It's quick and easy!
            </p>
            <Button 
              onClick={() => setCurrentView('create')}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Pass
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;