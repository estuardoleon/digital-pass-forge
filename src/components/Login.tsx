import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3900/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          loginTime: new Date().toISOString(),
        };

        setUser(userData);
        localStorage.setItem("passkit_session", JSON.stringify(userData));
        navigate("/dashboard");
        
        toast({
          title: "Login exitoso",
          description: `Bienvenido, ${userData.email}`,
        });
      } else {
        toast({
          title: "Error de login",
          description: data.error || "Credenciales incorrectas",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar al servidor",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3900/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          currentPassword: password, 
          newPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña ha sido cambiada exitosamente",
        });
        setIsChangingPassword(false);
        setNewPassword("");
        setConfirmPassword("");
        setPassword("");
      } else {
        toast({
          title: "Error",
          description: data.error || "No se pudo cambiar la contraseña",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar al servidor",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isChangingPassword ? "Cambiar Contraseña" : "Digital Pass Forge"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password">
              {isChangingPassword ? "Contraseña Actual" : "Contraseña"}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {isChangingPassword && (
            <>
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            {isChangingPassword ? (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleChangePassword} 
                  className="flex-1"
                  disabled={!email || !password || !newPassword || !confirmPassword}
                >
                  Actualizar Contraseña
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  onClick={handleLogin} 
                  className="w-full"
                  disabled={!email || !password}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full"
                >
                  ¿Necesitas cambiar tu contraseña?
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;