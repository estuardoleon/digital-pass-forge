import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ColumnFilter } from "@/components/ColumnFilter";
import { Edit, Trash2, User, Plus, Upload, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Members = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [editingMember, setEditingMember] = useState(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [visibleColumns, setVisibleColumns] = useState([
    "checkbox",
    "passkitId", 
    "externalId",
    "firstName",
    "lastName", 
    "email",
    "mobile",
    "tier",
    "points",
    "gender",
    "dateCreated",
    "actions"
  ]);

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:3900/api/members");
      const data = await response.json();
      console.log("🟢 Miembros desde backend:", data);
      
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        console.error("❌ La respuesta no es un array:", data);
        setMembers([]);
        toast({
          title: "Error",
          description: "No se pudieron cargar los miembros",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Error al obtener miembros:", error);
      setMembers([]);
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar al servidor",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(col => col !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setEditFormData({
      nombre: member.firstName || "",
      apellido: member.lastName || "",
      fechaNacimiento: member.dateOfBirth || "",
      codigoCliente: member.clientCode || "",
      codigoCampaña: member.campaignCode || "",
      tipoCliente: member.tier || "",
      email: member.email || "",
      telefono: member.mobile || "",
      genero: member.gender || "",
      puntos: member.points || 0,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3900/api/members/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Miembro actualizado correctamente",
        });
        setEditingMember(null);
        fetchMembers();
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el miembro",
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

  const handleDelete = async (memberId: number) => {
    try {
      const response = await fetch(`http://localhost:3900/api/members/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Miembro eliminado correctamente",
        });
        fetchMembers();
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el miembro",
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

  const handleSelectMember = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    setSelectedMembers(
      selectedMembers.length === members.length
        ? []
        : members.map((m: any) => m.id)
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Members</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/profile")}
          >
            <Plus className="w-4 h-4 mr-2" />
            ADD MEMBER
          </Button>
          
          <Button variant="outline" className="text-muted-foreground">
            <Upload className="w-4 h-4 mr-2" />
            IMPORT CSV
          </Button>
          
          <Button variant="outline" className="text-muted-foreground">
            <Download className="w-4 h-4 mr-2" />
            EXPORT CSV
          </Button>
          
          <ColumnFilter 
            visibleColumns={visibleColumns}
            onColumnToggle={handleColumnToggle}
          />
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                {visibleColumns.includes("checkbox") && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedMembers.length === members.length && members.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                {visibleColumns.includes("passkitId") && (
                  <TableHead className="font-medium text-muted-foreground">PASSKIT ID</TableHead>
                )}
                {visibleColumns.includes("externalId") && (
                  <TableHead className="font-medium text-muted-foreground">EXTERNAL ID</TableHead>
                )}
                {visibleColumns.includes("firstName") && (
                  <TableHead className="font-medium text-muted-foreground">FIRST NAME</TableHead>
                )}
                {visibleColumns.includes("lastName") && (
                  <TableHead className="font-medium text-muted-foreground">LAST NAME</TableHead>
                )}
                {visibleColumns.includes("email") && (
                  <TableHead className="font-medium text-muted-foreground">EMAIL</TableHead>
                )}
                {visibleColumns.includes("mobile") && (
                  <TableHead className="font-medium text-muted-foreground">MOBILE</TableHead>
                )}
                {visibleColumns.includes("tier") && (
                  <TableHead className="font-medium text-muted-foreground">TIER</TableHead>
                )}
                {visibleColumns.includes("points") && (
                  <TableHead className="font-medium text-muted-foreground">POINTS</TableHead>
                )}
                {visibleColumns.includes("gender") && (
                  <TableHead className="font-medium text-muted-foreground">GENDER</TableHead>
                )}
                {visibleColumns.includes("dateCreated") && (
                  <TableHead className="font-medium text-muted-foreground">DATE CREATED</TableHead>
                )}
                {visibleColumns.includes("actions") && (
                  <TableHead className="font-medium text-muted-foreground text-right">ACTIONS</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member: any) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  {visibleColumns.includes("checkbox") && (
                    <TableCell>
                      <Checkbox
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={() => handleSelectMember(member.id)}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.includes("passkitId") && (
                    <TableCell className="font-medium">{member.id}</TableCell>
                  )}
                  {visibleColumns.includes("externalId") && (
                    <TableCell className="text-blue-600">{member.externalId}</TableCell>
                  )}
                  {visibleColumns.includes("firstName") && (
                    <TableCell>{member.firstName}</TableCell>
                  )}
                  {visibleColumns.includes("lastName") && (
                    <TableCell>{member.lastName}</TableCell>
                  )}
                  {visibleColumns.includes("email") && (
                    <TableCell>{member.email}</TableCell>
                  )}
                  {visibleColumns.includes("mobile") && (
                    <TableCell>{member.mobile}</TableCell>
                  )}
                  {visibleColumns.includes("tier") && (
                    <TableCell>
                      <Badge variant={
                        member.tier === "Black" ? "default" :
                        member.tier === "Gold" ? "secondary" :
                        member.tier === "Silver" ? "outline" : "destructive"
                      }>
                        {member.tier}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.includes("points") && (
                    <TableCell>{member.points}</TableCell>
                  )}
                  {visibleColumns.includes("gender") && (
                    <TableCell>{member.gender}</TableCell>
                  )}
                  {visibleColumns.includes("dateCreated") && (
                    <TableCell>{member.createdAt}</TableCell>
                  )}
                  {visibleColumns.includes("actions") && (
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <User className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Información del Miembro</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div><strong>Nombre:</strong> {member.firstName}</div>
                              <div><strong>Apellido:</strong> {member.lastName}</div>
                              <div><strong>Email:</strong> {member.email}</div>
                              <div><strong>Teléfono:</strong> {member.mobile}</div>
                              <div><strong>Tier:</strong> {member.tier}</div>
                              <div><strong>Puntos:</strong> {member.points}</div>
                              <div><strong>Género:</strong> {member.gender}</div>
                              <div><strong>Fecha de Nacimiento:</strong> {member.dateOfBirth}</div>
                              <div><strong>Código Cliente:</strong> {member.clientCode}</div>
                              <div><strong>Código Campaña:</strong> {member.campaignCode}</div>
                              <div><strong>ID Externo:</strong> {member.externalId}</div>
                              <div><strong>Fecha Creación:</strong> {member.createdAt}</div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Miembro</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Nombre</Label>
                                <Input 
                                  value={editFormData.nombre || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, nombre: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Apellido</Label>
                                <Input 
                                  value={editFormData.apellido || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, apellido: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Email</Label>
                                <Input 
                                  value={editFormData.email || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Teléfono</Label>
                                <Input 
                                  value={editFormData.telefono || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, telefono: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Tier</Label>
                                <select
                                  value={editFormData.tipoCliente || ""}
                                  onChange={(e) => setEditFormData({...editFormData, tipoCliente: e.target.value})}
                                  className="w-full border rounded-md px-3 py-2"
                                >
                                  <option value="">Selecciona un tipo</option>
                                  <option value="Black">Black</option>
                                  <option value="Gold">Gold</option>
                                  <option value="Silver">Silver</option>
                                  <option value="Bronze">Bronze</option>
                                </select>
                              </div>
                              <div>
                                <Label>Puntos</Label>
                                <Input 
                                  type="number"
                                  value={editFormData.puntos || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, puntos: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Género</Label>
                                <select
                                  value={editFormData.genero || ""}
                                  onChange={(e) => setEditFormData({...editFormData, genero: e.target.value})}
                                  className="w-full border rounded-md px-3 py-2"
                                >
                                  <option value="">Selecciona</option>
                                  <option value="Masculino">Masculino</option>
                                  <option value="Femenino">Femenino</option>
                                  <option value="Otro">Otro</option>
                                </select>
                              </div>
                              <div>
                                <Label>Fecha de Nacimiento</Label>
                                <Input 
                                  type="date"
                                  value={editFormData.fechaNacimiento || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, fechaNacimiento: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Código Cliente</Label>
                                <Input 
                                  value={editFormData.codigoCliente || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, codigoCliente: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Código Campaña</Label>
                                <Input 
                                  value={editFormData.codigoCampaña || ""} 
                                  onChange={(e) => setEditFormData({...editFormData, codigoCampaña: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button variant="outline" onClick={() => setEditingMember(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleUpdate}>
                                Actualizar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente al miembro
                                {member.firstName} {member.lastName} de la base de datos.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(member.id)}>
                                Sí, eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Members;