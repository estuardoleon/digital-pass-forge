import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Linda Pérez');
  const [userEmail, setUserEmail] = useState('linda.perez@alcazaren.com.gt');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar
        </Button>
        
        <Button 
          variant="default" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          <Home className="w-4 h-4" />
          Menú Principal
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      <Card className="text-center">
        <CardContent className="flex flex-col items-center pt-6 space-y-3">
          <Avatar className="w-20 h-20">
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">{userName}</h3>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
          <p className="text-sm text-muted-foreground">Ingeniería en Sistemas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
