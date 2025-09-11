export function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="container-swiss grid-12">
        <header className="col-span-12 md:col-span-4">
          {kicker ? <div className="small uppercase tracking-[0.25em] mb-2">{kicker}</div> : null}
          <div className="mb-4">
            <h2>{title}</h2>
            </div>
        </header>
        <div className="col-span-12 md:col-span-8">
          {children}
        </div>
      </div>
    </section>
  );
}