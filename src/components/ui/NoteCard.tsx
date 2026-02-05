interface NoteCardProps {
  title: string;
  date: string;
  preview: string;
}

export function NoteCard({title, date, preview}: NoteCardProps) {
  return (
    <div
      className="bg-background-300 rounded-lg p-5 cursor-pointer border border-transparent hover:border-primary-100 transition-all text-left">
      {/* 본문 미리보기 */}
      <p className="text-text-4 text-gray-400 mb-4 line-clamp-3 h-[4.5em]">
        {preview}
      </p>

      {/* 제목 */}
      <h3 className="text-text-2 font-pb text-gray-100 mb-1 truncate">
        {title}
      </h3>

      {/* 날짜 */}
      <span className="text-caption text-gray-400">
        {date}
      </span>
    </div>
  );
}