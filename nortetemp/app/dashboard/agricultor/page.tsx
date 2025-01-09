export default function Page() {
  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Bem-vindo à Página do Agricultor
      </h2>
      <p className="text-gray-700 mb-4">
        Aqui você encontra informações úteis para ajudar no seu dia a dia no campo.
      </p>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Dicas de Plantio</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Planeje o plantio de acordo com o calendário agrícola da sua região.</li>
          <li>Utilize adubação orgânica para melhorar a qualidade do solo.</li>
          <li>Monitore pragas e doenças regularmente para evitar perdas na produção.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Previsão do Tempo</h3>
        <p className="text-gray-700">
          A previsão para os próximos dias em Manaus indica chuva moderada. 
          Ideal para iniciar o plantio de culturas que requerem umidade no solo.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Cuidados com o Solo</h3>
        <p className="text-gray-700">
          O solo da região de Manaus é rico em nutrientes, mas é importante realizar a rotação de culturas para evitar o esgotamento de recursos. Além disso, o uso de coberturas vegetais pode ajudar a manter a umidade.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-2">Apoio ao Agricultor</h3>
        <p className="text-gray-700">
          O governo oferece programas de apoio ao agricultor com subsídios para sementes, insumos e máquinas. Fique atento às datas de inscrição e aproveite as oportunidades.
        </p>
      </section>
    </div>
  );
}
