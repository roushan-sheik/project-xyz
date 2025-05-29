"use client";
import React, { useEffect } from "react";

function MainComponent() {
  const { data: user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1A1A1A]">
        <div className="text-xl text-[#B3935F]">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <header className="border-b border-[#333333] bg-[#1A1A1A] px-6 py-5">
        <div className="flex items-center">
          <a href="/" className="mr-4 text-[#B3935F] hover:text-[#8C714A]">
            <i className="fa-regular fa-arrow-left text-xl"></i>
          </a>
          <h1 className="text-xl font-light">サービス案内</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-light tracking-wider text-[#B3935F]">
            Your Perfect Alibi
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-gray-300">
            完璧なアリバイ作りをサポートする、プレミアムなサービスを提供いたします。
            あなたの大切な時間と関係性を守るために、私たちがお手伝いいたします。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&q=80"
                alt="アリバイ写真加工"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-image text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">アリバイ写真加工</h3>
              <p className="mb-6 font-light text-gray-400">
                プロフェッショナルによる高品質な写真加工で、完璧なアリバイを演出します。
                自然な仕上がりで、疑われることのない写真を提供いたします。
              </p>
              <a
                href="/photo-edit"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&q=80"
                alt="おじさん派遣"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-user text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">おじさん派遣</h3>
              <p className="mb-6 font-light text-gray-400">
                信頼できる紳士たちが、あなたの代理として各種イベントに参加いたします。
                自然な振る舞いで、周囲の信頼を得られる安心のサービスです。
              </p>
              <a
                href="/uncle-dispatch"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&q=80"
                alt="ダミー領収書"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-file-lines text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">ダミー領収書発行</h3>
              <p className="mb-6 font-light text-gray-400">
                本物そっくりの領収書を作成いたします。
                緻密な作りこみで、必要な証明書類として活用いただけます。
              </p>
              <a
                href="#"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&q=80"
                alt="LINE代行"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-comment text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">LINE代行</h3>
              <p className="mb-6 font-light text-gray-400">
                自然な会話の流れを作り出すプロフェッショナルが、
                あなたに代わってLINEでのコミュニケーションを代行いたします。
              </p>
              <a
                href="#"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&q=80"
                alt="お土産購入"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-gift text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">お土産購入</h3>
              <p className="mb-6 font-light text-gray-400">
                出張や旅行に行った証拠として、現地でしか手に入らない
                お土産を購入し、お届けいたします。
              </p>
              <a
                href="#"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#333333] bg-[#242424]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&q=80"
                alt="掛電代行"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 text-[#B3935F]">
                <i className="fa-regular fa-phone text-2xl"></i>
              </div>
              <h3 className="mb-3 text-xl font-light">掛電代行</h3>
              <p className="mb-6 font-light text-gray-400">
                プロのスタッフが、あなたに代わって必要な電話連絡を行います。
                状況に応じた適切な対応で、スムーズなコミュニケーションを実現します。
              </p>
              <a
                href="#"
                className="inline-block text-sm text-[#B3935F] transition-colors hover:text-[#8C714A]"
              >
                詳しく見る
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainComponent;
