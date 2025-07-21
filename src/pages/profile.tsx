import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { nanoid } from "nanoid";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    codigoCliente: "",
    codigoCampaña: "",
    tipoCliente: "",
    email: "",
    telefono: "",
    genero: "",
    puntos: "",
    idExterno: ""
  });

  const [members, setMembers] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({ ...formData });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(new Set());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (!formData.nombre || !formData.codigoCliente) {
      alert("Por favor llena al menos el nombre y código del cliente.");
      return;
    }
    
    const newMember = {
      ...formData,
      idExterno: formData.idExterno || nanoid(12) // Genera ID automáticamente si no se proporciona
    };
    
    setMembers([...members, newMember]);
    setFormData({
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      codigoCliente: "",
      codigoCampaña: "",
      tipoCliente: "",
      email: "",
      telefono: "",
      genero: "",
      puntos: "",
      idExterno: ""
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Enlace copiado al portapapeles");
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditData({ ...members[index] });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;
    const updatedMembers = [...members];
    updatedMembers[editIndex] = editData;
    setMembers(updatedMembers);
    setIsEditOpen(false);
    setEditIndex(null);
  };

  const toggleSelectMember = (index: number) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedMembers(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedMembers.size === members.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(members.map((_, i) => i)));
    }
  };

  const handleDeleteSelected = () => {
    const newMembers = members.filter((_, index) => !selectedMembers.has(index));
    setMembers(newMembers);
    setSelectedMembers(new Set());
  };

  const handleAdvance = () => {
    navigate("/members");
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Perfil del Cliente</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nombre</Label>
            <Input name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div>
            <Label>Apellido</Label>
            <Input name="apellido" value={formData.apellido} onChange={handleChange} />
          </div>
          <div>
            <Label>Fecha de nacimiento</Label>
            <Input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          </div>
          <div>
            <Label>Código del cliente</Label>
            <Input name="codigoCliente" value={formData.codigoCliente} onChange={handleChange} />
          </div>
          <div>
            <Label>Código de la campaña</Label>
            <Input name="codigoCampaña" value={formData.codigoCampaña} onChange={handleChange} />
          </div>
          <div>
            <Label>Tipo de cliente</Label>
            <select
              name="tipoCliente"
              value={formData.tipoCliente}
              onChange={handleChange}
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
            <Label>Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div>
            <Label>Género</Label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Selecciona</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <Label>Puntos</Label>
            <Input name="puntos" value={formData.puntos} onChange={handleChange} />
          </div>
          <div>
            <Label>ID Externo</Label>
            <Input name="idExterno" value={formData.idExterno} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => navigate("/settings")}>Regresar</Button>
          <div className="flex gap-4">
            <Button onClick={handleAddMember}>Guardar</Button>
            <Button onClick={handleAdvance}>Avanzar</Button>
          </div>
        </div>
      </div>

      {members.length > 0 && (
        <div className="w-full max-w-4xl mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Miembros Registrados</h3>
            {selectedMembers.size > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleDeleteSelected}
                className="bg-red-500 hover:bg-red-600"
              >
                DELETE ({selectedMembers.size})
              </Button>
            )}
          </div>
          <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">
                    <input 
                      type="checkbox" 
                      checked={members.length > 0 && selectedMembers.size === members.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="p-4 font-medium text-gray-900">ID Externo</th>
                  <th className="p-4 text-right font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        checked={selectedMembers.has(i)}
                        onChange={() => toggleSelectMember(i)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4 font-mono text-blue-600 text-sm">{m.idExterno}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver perfil"
                        >
                          👤
                        </button>
                        <button 
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                          onClick={() => openEditModal(i)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" 
                          onClick={() => handleCopy(m.idExterno)}
                          title="Copiar enlace"
                        >
                          🔗
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para editar */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="nombre" placeholder="Nombre" value={editData.nombre} onChange={handleEditChange} />
            <Input name="apellido" placeholder="Apellido" value={editData.apellido} onChange={handleEditChange} />
            <Input type="date" name="fechaNacimiento" value={editData.fechaNacimiento} onChange={handleEditChange} />
            <Input name="codigoCliente" placeholder="Código Cliente" value={editData.codigoCliente} onChange={handleEditChange} />
            <Input name="codigoCampaña" placeholder="Código Campaña" value={editData.codigoCampaña} onChange={handleEditChange} />
            <select name="tipoCliente" value={editData.tipoCliente} onChange={handleEditChange} className="border rounded-md p-2">
              <option value="">Selecciona</option>
              <option value="Black">Black</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
            <Input name="email" placeholder="Email" value={editData.email} onChange={handleEditChange} />
            <Input name="telefono" placeholder="Teléfono" value={editData.telefono} onChange={handleEditChange} />
            <select name="genero" value={editData.genero} onChange={handleEditChange} className="border rounded-md p-2">
              <option value="">Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <Input name="puntos" placeholder="Puntos" value={editData.puntos} onChange={handleEditChange} />
            <Input name="idExterno" placeholder="ID Externo" value={editData.idExterno} onChange={handleEditChange} />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    
  );
};

export default Profile;