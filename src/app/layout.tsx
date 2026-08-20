import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '钻爆法隧道全工序机械化施工智能配置系统',
  description:
    '输入围岩地质数据，自动推荐开挖工法与支护参数，配置施工装备，输出一套完整施工方案。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}