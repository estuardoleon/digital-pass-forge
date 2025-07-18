import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2"
        >
          Avanzar
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Configuraciones</h2>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del usuario</Label>
            <Input 
              id="name" 
              placeholder="Escribe tu nombre completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button 
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={() => {
              localStorage.setItem('userName', name);
              localStorage.setItem('userEmail', email);
              setName('');
              setEmail('');
              toast({
                title: "Información guardada",
                description: "Los cambios se han guardado correctamente.",
              });
            }}
          >
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
