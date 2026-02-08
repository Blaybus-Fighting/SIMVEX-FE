type thumbnailPros = {
  thumbnailUrl: string;
  name: string;
  edit: string;
};

export default function ModelThumbnail({ name, edit }: thumbnailPros) {
  return (
    <section>
      {/* 이미지 썸네일 */}
      {/* 모델 이름과 수정 시간 */}
      <div className="flex flex-col gap-1 p-3 bg-background-400 rounded-b-xl text-left">
        <h3 className="text-text-2 font-medium text-gray-100">{name}</h3>
        <p className="text-caption font-medium text-gray-200 ">{edit}</p>
      </div>
    </section>
  );
}
