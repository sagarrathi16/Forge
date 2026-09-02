export default function TemplatesLoading() {
  return (
    <div className="bg-surface-container-lowest text-on-background font-sans antialiased min-h-screen flex flex-col">
      {/* Header skeleton */}
      <header className="bg-background/90 backdrop-blur-md w-full top-0 sticky z-50 border-b border-outline-variant h-[61px] flex items-center px-4 md:px-16">
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
          <div className="w-24 h-6 bg-surface-container rounded animate-pulse"></div>
          <div className="hidden md:flex gap-4">
            <div className="w-16 h-4 bg-surface-container rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-surface-container rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-surface-container rounded animate-pulse"></div>
          </div>
          <div className="w-28 h-8 bg-surface-container rounded animate-pulse"></div>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Title skeleton */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="w-24 h-4 bg-primary/20 rounded mx-auto animate-pulse"></div>
          <div className="w-72 h-8 bg-surface-container rounded mx-auto animate-pulse"></div>
          <div className="w-96 max-w-full h-4 bg-surface-container/70 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Categories skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-20 h-7 bg-surface-container rounded border border-outline-variant/60 animate-pulse"></div>
          ))}
        </div>

        {/* 6 Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-lg p-6 bg-surface border border-outline-variant/60 flex flex-col justify-between space-y-5 animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-20 h-4 bg-primary/10 rounded border border-primary/20"></div>
                  <div className="w-14 h-4 bg-surface-container-high rounded border border-outline-variant/60"></div>
                </div>

                <div className="w-3/4 h-6 bg-surface-container rounded"></div>
                <div className="space-y-2 pt-1">
                  <div className="w-full h-3.5 bg-surface-container/70 rounded"></div>
                  <div className="w-4/5 h-3.5 bg-surface-container/70 rounded"></div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex gap-1.5">
                  <div className="w-14 h-4 bg-surface-container-low rounded border border-outline-variant/40"></div>
                  <div className="w-16 h-4 bg-surface-container-low rounded border border-outline-variant/40"></div>
                  <div className="w-14 h-4 bg-surface-container-low rounded border border-outline-variant/40"></div>
                </div>

                <div className="w-full h-9 bg-surface-container rounded border border-outline-variant/60"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
