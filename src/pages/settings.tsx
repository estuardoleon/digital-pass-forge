import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Home, Shield, Mail, Smartphone, Database, Settings as SettingsIcon, Eye, EyeOff } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Admin settings
  const [isAdmin, setIsAdmin] = useState(false);
  const [distributionEmail, setDistributionEmail] = useState("");
  const [googleAuth, setGoogleAuth] = useState(false);
  const [appleAuth, setAppleAuth] = useState(false);
  const [loyaltyStep, setLoyaltyStep] = useState(false);
  const [androidVersion, setAndroidVersion] = useState("");

  useEffect(() => {
    // Check if user is admin (you can modify this logic)
    const userRole = localStorage.getItem('userRole') || 'user';
    setIsAdmin(userRole === 'admin');
  }, []);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error", 
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally validate current password with backend
    localStorage.setItem('userPassword', newPassword);
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente"
    });
  };

  const handleSaveAdminSettings = () => {
    const adminSettings = {
      distributionEmail,
      googleAuth,
      appleAuth, 
      loyaltyStep,
      androidVersion
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    
    toast({
      title: "Configuración guardada",
      description: "La configuración del administrador ha sido guardada"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Configuraciones</h1>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Regresar
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Menú Principal
            </Button>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Mi Cuenta</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin">Configuración Admin</TabsTrigger>}
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Cambiar Contraseña
                </CardTitle>
                <CardDescription>
                  Actualiza tu contraseña para mantener tu cuenta segura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Contraseña Actual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña actual"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <Input
                    id="newPassword"
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingresa tu nueva contraseña"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>

                <Button 
                  onClick={handleChangePassword}
                  className="bg-[#7069e3] hover:bg-[#5f58d1] text-white"
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  Actualizar Contraseña
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Tab */}
          {isAdmin && (
            <TabsContent value="admin" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Configuración de Usuario
                  </CardTitle>
                  <CardDescription>
                    Gestiona la creación de usuarios y configuraciones del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="distributionEmail">Email de Distribución</Label>
                    <Input
                      id="distributionEmail"
                      type="email"
                      value={distributionEmail}
                      onChange={(e) => setDistributionEmail(e.target.value)}
                      placeholder="admin@company.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Configuración de Acceso
                  </CardTitle>
                  <CardDescription>
                    Configura los métodos de autenticación disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Acceso con Google</Label>
                      <p className="text-sm text-muted-foreground">Permitir inicio de sesión con Google</p>
                    </div>
                    <Switch
                      checked={googleAuth}
                      onCheckedChange={setGoogleAuth}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Acceso con Apple</Label>
                      <p className="text-sm text-muted-foreground">Permitir inicio de sesión con Apple</p>
                    </div>
                    <Switch
                      checked={appleAuth}
                      onCheckedChange={setAppleAuth}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Paso de Lealtad</Label>
                      <p className="text-sm text-muted-foreground">Activar programa de lealtad</p>
                    </div>
                    <Switch
                      checked={loyaltyStep}
                      onCheckedChange={setLoyaltyStep}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    Configuración Android
                  </CardTitle>
                  <CardDescription>
                    Configuraciones específicas para la aplicación Android
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="androidVersion">Versión Android Mínima</Label>
                    <Input
                      id="androidVersion"
                      value={androidVersion}
                      onChange={(e) => setAndroidVersion(e.target.value)}
                      placeholder="8.0"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Acceso Backend
                  </CardTitle>
                  <CardDescription>
                    Configuraciones avanzadas del sistema y base de datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Estado: Conectado a Supabase</p>
                    <p className="text-xs text-muted-foreground">
                      Para configurar completamente el backend con CRUD, autenticación y gestión de usuarios,
                      se requiere activar la integración con Supabase.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.open('https://docs.lovable.dev/integrations/supabase/', '_blank')}
                    >
                      Ver Documentación
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleSaveAdminSettings}
                className="bg-[#7069e3] hover:bg-[#5f58d1] text-white w-full"
              >
                Guardar Configuración del Administrador
              </Button>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;