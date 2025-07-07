
import { useState } from 'react';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import PassCard from '@/components/PassCard';
import CreatePassForm from '@/components/CreatePassForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create'>('dashboard');

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

  if (currentView === 'create') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('dashboard')}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
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
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your digital passes and track their performance.
          </p>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Create your first pass
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first digital pass. It's quick and easy!
            </p>
            <Button 
              onClick={() => setCurrentView('create')}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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

export default Index;
