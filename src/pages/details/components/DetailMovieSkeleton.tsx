export default function DetailMovieSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <article className="relative w-full h-full overflow-scroll">
        <section className="relative w-full h-full">
          {/* 왼쪽 그라디언트 */}
          <div
            className="absolute z-10 w-full h-full bg-gradient-to-r from-[#1E1E1E] from-0% via-[#1E1E1E] via-62% to-transparent to-100%"
            aria-label="background-gradient"
          />

          {/* 포스터 이미지 스켈레톤 */}
          <div className="absolute top-0 right-0 z-0 w-1/2 h-full rounded-lg skeleton" />
        </section>

        {/* 컨텐츠 영역 */}
        <section className="absolute top-0 left-0 z-20 w-full h-full pt-80">
          {/* 상단 컨텐츠 */}
          <div aria-label="contents" className="max-w-[1520px] mx-auto max-[1519px]:p-8">
            {/* 장르 스켈레톤 */}
            <ul className="flex gap-2 mb-4 max-w-[1520px]">
              {[1, 2, 3].map((i) => (
                <li key={i} className="w-20 px-4 py-1 mb-1 rounded-full skeleton h-7" />
              ))}
            </ul>
            {/* 제목 스켈레톤 */}
            <div className="mb-6 skeleton h-12 w-[600px] rounded-lg" />
            {/* 설명 스켈레톤 */}
            <div className="w-[450px] max-h-[9em] skeleton rounded-lg" />
          </div>

          {/* 하단 컨텐츠 */}
          <section className="relative mt-16 h-full bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E] via-65% to-transparent">
            <figure className="max-[1519px]:p-8 relative z-10 w-full max-w-[1520px] mx-auto">
              {/* 버튼 영역 */}
              <div className="flex justify-end gap-6 mb-8 max-w-[1520px] mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full skeleton" />
                    <div className="w-12 h-4 rounded-lg skeleton" />
                  </div>
                ))}
              </div>

              {/* 트레일러 스와이퍼 영역 */}
              <div className="flex justify-end gap-4 mb-8 max-w-[1520px] mx-auto mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-[300px] h-[169px] rounded-lg skeleton" />
                ))}
              </div>
            </figure>

            {/* 출연진 목록 */}
            <div className="max-w-[1520px] mx-auto max-[1519px]:p-8">
              <div className="w-32 h-8 mb-6 rounded-lg skeleton" /> {/* 제목 */}
              <div className="grid grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="aspect-[2/3] rounded-lg skeleton" />
                    <div className="w-3/4 h-4 rounded-lg skeleton" />
                    <div className="w-1/2 h-4 rounded-lg skeleton" />
                  </div>
                ))}
              </div>
            </div>

            {/* 유사 영화 */}
            <div className="max-w-[1520px] mx-auto max-[1519px]:p-8 mt-12">
              <div className="w-32 h-8 mb-6 rounded-lg skeleton" /> {/* 제목 */}
              <div className="grid grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[2/3] rounded-lg skeleton" />
                ))}
              </div>
            </div>

            {/* 댓글 작성 영역 */}
            <div className="w-full max-w-[1520px] mx-auto max-[1519px]:p-8">
              <div className="w-32 h-8 pt-12 pb-6 rounded-lg skeleton" /> {/* 제목 */}
              <div className="w-full min-h-40 rounded-2xl skeleton" />
            </div>

            {/* 댓글 목록 */}
            <div className="max-w-[1520px] mx-auto max-[1519px]:p-8 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full skeleton" />
                  <div className="flex-1">
                    <div className="w-24 h-4 mb-2 rounded-lg skeleton" />
                    <div className="h-16 rounded-lg skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </article>
    </div>
  );
}