import coracao from "../assets/coracao.svg"

export default function Post({ postData }) {
  const iniciais = postData.autor_nome?.slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col bg-white p-5 rounded-[10px] mb-5 shadow-md w-2xl">
      <div className="flex gap-3 items-center mb-3">
        <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full text-white font-bold">
          {iniciais}
        </div>
        <p className="text-purple-600 text-[18px] font-bold">
          {postData.autor_nome || "Usuário"}
        </p>
      </div>
      
      <div className="pl-[52px]">
        <p className="text-gray-800 text-[16px] text-wrap whitespace-pre-line mb-3">
          {postData.conteudo}
        </p>
      </div>

      {postData.imagens && postData.imagens.length > 0 && (
        <div className="pl-[52px] mb-3">
          <div className="grid grid-cols-2 gap-2">
            {postData.imagens.map((imagem, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img 
                  src={imagem}
                  alt={`Post de ${postData.nomeUser}`}
                  className="h-36 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-4 mt-3 pt-3 border-t border-gray-100">
        <button className="cursor-pointer text-gray-500 hover:text-purple-600">
          <img src={ coracao } className="to-purple-600" ></img>
        </button>
        <button className="cursor-pointer text-gray-500 hover:text-purple-600">
          Comentar
        </button>
      </div>
    </div>
  );
}