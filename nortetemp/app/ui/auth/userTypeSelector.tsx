export function UserTypeSelector({
    userType,
    setUserType,
  }: {
    userType: string;
    setUserType: (value: string) => void;
  }) {
    return (
      <div className="mt-4">
        <label
          className="mb-3 block text-xs font-medium text-gray-900"
          htmlFor="userType"
        >
          Tipo de Usuário
        </label>
        <div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="padrao"
                checked={userType === "padrao"}
                onChange={(e) => setUserType(e.target.value)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Padrão</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="jornalista"
                checked={userType === "jornalista"}
                onChange={(e) => setUserType(e.target.value)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Jornalista</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="agricultor"
                checked={userType === "agricultor"}
                onChange={(e) => setUserType(e.target.value)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Agricultor</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
  