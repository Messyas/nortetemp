import EditablePhoneNumber from "@/app/ui/dashboard/phone-component/EditablePhoneNumber";

export default function Page() {

    return (
      <div className="flex flex-col p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Configurações de Notificações</h2>
      
      <p className="mt-2 text-gray-600">
        Aqui você pode adicionar o número de telefone que deseja usar para receber notificações sobre o clima de Manaus no WhatsApp.
      </p>

      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Número de Telefone</h1>
      <EditablePhoneNumber initialPhone="(11) 91234-5678" />
    </div>

      </div>
    );
  }