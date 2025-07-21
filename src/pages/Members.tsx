import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const navigate = useNavigate();

  // Puedes traer los miembros desde React Context, Zustand, localStorage, o más adelante, de MongoDB
  const dummyMembers = JSON.parse(localStorage.getItem("clientes") || "[]");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Miembros Registrados</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Regresar
        </Button>
      </div>

      {dummyMembers.length === 0 ? (
        <p className="text-gray-500">No hay miembros registrados aún.</p>
      ) : (
        <table className="w-full border rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">✔</th>
              <th className="p-3">ID Externo</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dummyMembers.map((m: any, i: number) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 font-mono">{m.idExterno}</td>
                <td className="p-3 flex justify-end gap-3">
                  <button className="text-gray-600 hover:text-blue-600">👤</button>
                  <button className="text-gray-600 hover:text-green-600">📝</button>
                  <button
                    className="text-gray-600 hover:text-purple-600"
                    onClick={() => navigator.clipboard.writeText(m.idExterno)}
                  >
                    🔗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Members;
