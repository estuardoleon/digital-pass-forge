import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Settings, Server, Shield, Mail, Smartphone, Database, Loader2 } from "lucide-react";

interface AdminSettingsData {
  backendUrl: string;
  googleAuth: boolean;
  appleAuth: boolean;
  distributionEmail: string;
  loyaltyStep: boolean;
  androidVersion: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<AdminSettingsData>({
    backendUrl: "http://localhost:3900",
    googleAuth: false,
    appleAuth: false,
    distributionEmail: "",
    loyaltyStep: false,
    androidVersion: ""
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveSettings = async () => {
    // Basic validations
    if (settings.distributionEmail && !validateEmail(settings.distributionEmail)) {
      toast({
        title: "Error de validación",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }

    if (!settings.backendUrl.trim()) {
      toast({
        title: "Error de validación", 
        description: "La URL del backend es requerida",
        variant: "destructive"
      });
      return;
    }

    if (settings.androidVersion && settings.androidVersion.trim().length === 0) {
      toast({
        title: "Error de validación",
        description: "La versión de Android no puede estar vacía si se especifica",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save settings to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      toast({
        title: "Configuración guardada",
        description: "Todas las configuraciones han sido guardadas exitosamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar las configuraciones",
        variant: "destructive"
      });
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = <K extends keyof AdminSettingsData>(
    key: K, 
    value: AdminSettingsData[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          Configuraciones de Administrador
        </h2>
      </div>

      {/* Backend Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Configuración del Backend
          </CardTitle>
          <CardDescription>
            Gestiona la conexión y URL del servidor backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="backendUrl">URL del Backend</Label>
            <Input
              id="backendUrl"
              value={settings.backendUrl}
              onChange={(e) => updateSetting('backendUrl', e.target.value)}
              placeholder="http://localhost:3900"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL actual del servidor backend
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configuración de Autenticación
          </CardTitle>
          <CardDescription>
            Controla los métodos de inicio de sesión disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Google Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Permitir inicio de sesión con cuentas de Google
              </p>
            </div>
            <Switch
              checked={settings.googleAuth}
              onCheckedChange={(checked) => updateSetting('googleAuth', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Apple Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Permitir inicio de sesión con Apple ID
              </p>
            </div>
            <Switch
              checked={settings.appleAuth}
              onCheckedChange={(checked) => updateSetting('appleAuth', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Configuración de Notificaciones
          </CardTitle>
          <CardDescription>
            Configura el email que recibirá las notificaciones del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="distributionEmail">Email de Distribución</Label>
            <Input
              id="distributionEmail"
              type="email"
              value={settings.distributionEmail}
              onChange={(e) => updateSetting('distributionEmail', e.target.value)}
              placeholder="admin@digitalpassforge.com"
            />
            <p className="text-xs text-muted-foreground">
              Todas las notificaciones del sistema se enviarán a este email
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Funcionalidades de la App
          </CardTitle>
          <CardDescription>
            Activa o desactiva características específicas de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Programa de Fidelización</Label>
              <p className="text-xs text-muted-foreground">
                Activar sistema de puntos y recompensas para miembros
              </p>
            </div>
            <Switch
              checked={settings.loyaltyStep}
              onCheckedChange={(checked) => updateSetting('loyaltyStep', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Configuración de App Móvil
          </CardTitle>
          <CardDescription>
            Configuraciones específicas para la aplicación Android
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="androidVersion">Versión Mínima de Android</Label>
            <Input
              id="androidVersion"
              value={settings.androidVersion}
              onChange={(e) => updateSetting('androidVersion', e.target.value)}
              placeholder="8.0"
            />
            <p className="text-xs text-muted-foreground">
              Versión mínima requerida de Android para usar la app
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar Configuración"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;