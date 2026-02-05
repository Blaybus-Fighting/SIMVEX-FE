export function AiChatTab() {
  return (
    <div
      className="flex flex-col h-full justify-center items-center text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-6xl mb-4">🤖</div>
      <h2 className="text-white text-xl font-bold mb-2">무엇을 도와드릴까요?</h2>
      <p className="text-gray-400 text-sm">
        궁금한 내용을 물어보거나,<br/>
        작성한 노트를 요약해달라고 해보세요.
      </p>

      {/* 나중에 여기에 채팅 UI 구현 */}
    </div>
  );
}