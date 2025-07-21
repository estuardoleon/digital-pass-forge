import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
=======
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { nanoid } from "nanoid";
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63

const Profile = () => {
  const [step, setStep] = useState(1);
  const [members, setMembers] = useState<any[]>([]);
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
    idExterno: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({ ...formData });
<<<<<<< HEAD
  const [openDialog, setOpenDialog] = useState(false);
=======
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(new Set());
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
<<<<<<< HEAD
    setMembers([...members, formData]);
=======
    if (!formData.nombre || !formData.codigoCliente) {
      alert("Por favor llena al menos el nombre y código del cliente.");
      return;
    }
    
    const newMember = {
      ...formData,
      idExterno: formData.idExterno || nanoid(12) // Genera ID automáticamente si no se proporciona
    };
    
    setMembers([...members, newMember]);
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63
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
      idExterno: "",
    });
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(members[index]);
    setOpenDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedMembers = [...members];
    if (editIndex !== null) updatedMembers[editIndex] = editData;
    setMembers(updatedMembers);
    setOpenDialog(false);
  };

<<<<<<< HEAD
  const handleDelete = (index: number) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };
=======
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
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Perfil del Cliente</h1>
        <div className="space-x-2">
          <Button onClick={handleBack}>Regresar</Button>
          <Button onClick={handleNext}>Avanzar</Button>
        </div>
      </header>

      {step === 1 && (
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
            <select name="tipoCliente" className="w-full border rounded p-2" value={formData.tipoCliente} onChange={handleChange}>
              <option value="">Selecciona un tipo</option>
              <option value="black">Black</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
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
            <select name="genero" className="w-full border rounded p-2" value={formData.genero} onChange={handleChange}>
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
          <div className="md:col-span-2">
            <Label>ID Externo</Label>
            <Input name="idExterno" value={formData.idExterno} onChange={handleChange} />
          </div>
        </div>
      )}

<<<<<<< HEAD
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Miembros</h2>
            <Button onClick={handleAddMember}>Añadir nuevo miembro</Button>
=======
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => navigate("/settings")}>Regresar</Button>
          <div className="flex gap-4">
            <Button onClick={handleAddMember}>Guardar</Button>
            <Button onClick={handleAdvance}>Avanzar</Button>
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63
          </div>

<<<<<<< HEAD
          <div className="space-y-2">
            {members.map((member, index) => (
              <div key={index} className="p-4 border rounded flex justify-between items-center">
                <div>
                  <p><strong>{member.nombre} {member.apellido}</strong></p>
                  <p>Email: {member.email}</p>
                  <p>Teléfono: {member.telefono}</p>
                  <p>Fecha de nacimiento: {member.fechaNacimiento}</p>
                  <p>Cliente: {member.codigoCliente}</p>
                  <p>Campaña: {member.codigoCampaña}</p>
                  <p>Tipo: {member.tipoCliente}</p>
                  <p>Género: {member.genero}</p>
                  <p>Puntos: {member.puntos}</p>
                  <p>ID externo: {member.idExterno}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEdit(index)}><Pencil size={16} /></Button>
                  <Button variant="outline" onClick={() => handleDelete(index)}><Trash size={16} /></Button>
                </div>
              </div>
            ))}
=======
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
>>>>>>> ca4e7f71c0701130b819e20494fa57a7044b1d63
          </div>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar miembro</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input name="nombre" placeholder="Nombre" value={editData.nombre} onChange={e => setEditData({ ...editData, nombre: e.target.value })} />
            <Input name="apellido" placeholder="Apellido" value={editData.apellido} onChange={e => setEditData({ ...editData, apellido: e.target.value })} />
            <Input name="email" placeholder="Email" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
            <Input name="telefono" placeholder="Teléfono" value={editData.telefono} onChange={e => setEditData({ ...editData, telefono: e.target.value })} />
            <Input name="fechaNacimiento" placeholder="Fecha Nacimiento" value={editData.fechaNacimiento} onChange={e => setEditData({ ...editData, fechaNacimiento: e.target.value })} />
            <Input name="codigoCliente" placeholder="Código Cliente" value={editData.codigoCliente} onChange={e => setEditData({ ...editData, codigoCliente: e.target.value })} />
            <Input name="codigoCampaña" placeholder="Código Campaña" value={editData.codigoCampaña} onChange={e => setEditData({ ...editData, codigoCampaña: e.target.value })} />
            <select name="tipoCliente" className="w-full border rounded p-2" value={editData.tipoCliente} onChange={e => setEditData({ ...editData, tipoCliente: e.target.value })}>
              <option value="">Selecciona tipo</option>
              <option value="black">Black</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
            <select name="genero" className="w-full border rounded p-2" value={editData.genero} onChange={e => setEditData({ ...editData, genero: e.target.value })}>
              <option value="">Selecciona género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <Input name="puntos" placeholder="Puntos" value={editData.puntos} onChange={e => setEditData({ ...editData, puntos: e.target.value })} />
            <Input name="idExterno" placeholder="ID Externo" value={editData.idExterno} onChange={e => setEditData({ ...editData, idExterno: e.target.value })} />
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
