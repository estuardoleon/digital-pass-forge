import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    setMembers([...members, formData]);
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

  const handleDelete = (index: number) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

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

      {step === 2 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Miembros</h2>
            <Button onClick={handleAddMember}>Añadir nuevo miembro</Button>
          </div>

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
