export default function CommunityLoading() {
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
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <div className="w-28 h-4 bg-primary/20 rounded mx-auto animate-pulse"></div>
          <div className="w-64 h-8 bg-surface-container rounded mx-auto animate-pulse"></div>
          <div className="w-80 max-w-full h-4 bg-surface-container/70 rounded mx-auto animate-pulse"></div>
        </div>

        {/* 3 Metric counters skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 text-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg p-6 bg-surface border border-outline-variant/60 space-y-2 animate-pulse">
              <div className="w-24 h-9 bg-primary/20 rounded mx-auto"></div>
              <div className="w-32 h-3.5 bg-surface-container rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Community Projects skeletons */}
        <div className="mb-16">
          <div className="w-48 h-6 bg-surface-container rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg p-6 bg-surface border border-outline-variant/60 space-y-4 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-32 h-5 bg-surface-container rounded"></div>
                    <div className="w-16 h-4 bg-primary/10 rounded"></div>
                  </div>
                  <div className="w-full h-3.5 bg-surface-container/70 rounded"></div>
                  <div className="w-4/5 h-3.5 bg-surface-container/70 rounded"></div>
                </div>

                <div className="space-y-3 pt-2 border-t border-outline-variant/40">
                  <div className="flex gap-1.5">
                    <div className="w-12 h-4 bg-surface-container-low rounded"></div>
                    <div className="w-16 h-4 bg-surface-container-low rounded"></div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="w-20 h-4 bg-surface-container rounded"></div>
                    <div className="flex gap-2">
                      <div className="w-12 h-6 bg-surface-container rounded"></div>
                      <div className="w-12 h-6 bg-surface-container rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg p-6 bg-surface border border-outline-variant/60 space-y-4 animate-pulse">
              <div className="w-full h-4 bg-surface-container rounded"></div>
              <div className="w-3/4 h-4 bg-surface-container rounded"></div>
              <div className="border-t border-outline-variant/40 pt-3 flex justify-between items-center">
                <div className="w-24 h-4 bg-surface-container rounded"></div>
                <div className="w-20 h-4 bg-primary/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
