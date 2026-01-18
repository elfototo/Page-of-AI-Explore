
export const StreamingOutput: React.FC<{
  text: string;
  isStreaming: boolean;
}> = ({ text, isStreaming }) => {
  const highlightJSON = (text: string) => {
    const parts = text.split(/(```json[\s\S]*?```)/g);

    return parts.map((part, i) => {
      if (part.startsWith("```json") || part.startsWith("```")) {
        const content = part.replace(/```json\n?|```\n?/g, "");

        try {
          JSON.parse(content);

          const hilightStyles = content
            .replace(
              /(".*?")(\s*:)/g,
              '<span class="text-purple-600 font-semibold">$1</span>$2'
            ) // ключи
            .replace(/:\s*(".*?")/g, ': <span class="text-green-600">$1</span>') // строковые значения
            .replace(
              /:\s*(\d+\.?\d*)/g,
              ': <span class="text-blue-600">$1</span>'
            ) // числа
            .replace(
              /:\s*(true|false|null)/g,
              ': <span class="text-orange-600 font-semibold">$1</span>'
            ); // булевы и null

          return (
            <div
              key={i}
              className="my-3 bg-gray-800 rounded-lg p-4 overflow-x-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase font-semibold">
                  JSON
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(content)}
                  className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
                >
                  Копировать
                </button>
              </div>
              <pre
                className="text-sm text-gray-100 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: hilightStyles }}
              />
            </div>
          );
        } catch {
          return (
            <div
              key={i}
              className="my-3 bg-white rounded-lg p-4 overflow-x-auto border-l-4 border-yellow-400"
            >
              <span className="text-xs text-gray-500 uppercase font-semibold block mb-2">
                CODE
              </span>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {content}
              </pre>
            </div>
          );
        }
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="border text-start w-full border-gray-300 rounded-lg p-4 bg-white text-sm whitespace-pre-wrap h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 font-sans">Streaming Output</h3>
      {text ? (
        highlightJSON(text)
      ) : (
        <h3 className="flex items-center justify-center h-64 text-gray-400">Нажмите Play для начала...</h3>
      )}
      {isStreaming && <span className="animate-pulse ml-1">▊</span>}
    </div>
  );
};
