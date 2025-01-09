export default function Page() {
  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Bem-vindo à Página do Jornalista
      </h2>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Gerar Relatórios sobre o clima em PDF</h3>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Acesso a Dados Climáticos em Tempo Real</h3>
        <p className="text-gray-700">
          A plataforma fornece dados climáticos atualizados em tempo real, permitindo que você tenha acesso imediato às informações mais recentes sobre o clima em qualquer região. Isso é especialmente útil para coberturas jornalísticas de eventos climáticos e emergências.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Notificações Personalizadas</h3>
        <p className="text-gray-700">
          Receba notificações personalizadas sobre condições climáticas críticas que possam afetar suas coberturas jornalísticas. Isso inclui mudanças rápidas no clima, eventos climáticos extremos e outras informações relevantes.
        </p>
      </section>
    </div>
  );
}
