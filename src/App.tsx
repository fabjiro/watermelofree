import { useState } from "react";
import axios from "axios";

function App() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const [inputName, setInputName] = useState<string>("");
  const [indentity, setIndentity] = useState<string>("");

  const onSend = async () => {
    setIsSending(true);

    try {
      const response = await axios.post(
        "https://uploader-service.onrender.com/waterfree",
        {
          username: inputName,
          identity: indentity,
        }
      );

      const result = response.data;
      console.log(result);
      if ("code" in result) {
        const code = result.code ?? "xd";
        console.log(`Code: ${code}`);

        if (code.length > 0) {
          setCode(code);
        } else {
          setCode("Verifica bien los campos o estos datos ya se han usado");
        }
      }
    } catch (error) {
      setCode("Verifica bien los campos o estos datos ya se han usado");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen w-screen p-4">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <img src="img.png" width="50px" alt="embullados logo" />
          <h1 className="text-3xl font-bold text-center">Los embullados</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">
              Nombre y apellido:
            </label>
            <input
              id="input-text"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="daniel ortega(mamaturca)"
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cedula:</label>
            <input
              id="input-text"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="000-000000-00000"
              onChange={(e) => setIndentity(e.target.value)}
            />
          </div>
          <button
            onClick={onSend}
            type="button"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
          >
            {isSending ? (
              <div className="loader loader--style1" title="0">
                <svg
                  version="1.1"
                  id="loader-1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25px"
                  height="25px"
                  viewBox="0 0 40 40"
                  enable-background="new 0 0 40 40"
                >
                  <path
                    opacity="0.2"
                    fill="#000"
                    d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                  />
                  <path
                    fill="#000"
                    d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
                  >
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </div>

      {code.length > 0 ? (
        <h1 className="text-3xl font-bold text-center">{code}</h1>
      ) : null}
    </div>
  );
}

export default App;
