// ✅ TODO 나중에 기능 구현끝나면 디자인 수정할 때 되면 할 예정
// header를 상단에 고정하고 바디는 페이지마다 헤더와의 차이가 다름
// app.css에서 #root에서 padding을 지우고 <AppLayout />를 페이지마다 최상단 컴포넌트에 대입
import Header from "@components/ui/Header";

interface AppLayoutProps {
  headerType: "asset" | "study";
  title: string;
  children: React.ReactNode;
  contentTopPadding?: string; // Tailwind class
}

export default function AppLayout({
  headerType,
  title,
  children,
  contentTopPadding = "pt-[calc(3.75rem+2rem)]", // 기본값
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[3.75rem]">
        <div className="px-8">
          <Header type={headerType} title={title} />
        </div>
      </header>

      {/* Body */}
      <main className={`px-8 pb-8 ${contentTopPadding}`}>{children}</main>
    </div>
  );
}
