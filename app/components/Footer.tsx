export function Footer() {
return (
<footer className="footer-shell">
    <div className="container-swiss grid-12 items-end py-10">
        <div className="col-span-12 md:col-span-8">
            <p className="card-muted">© {new Date().getFullYear()} Muhammad Tarreq</p>
            </div>
        <div className="col-span-12 md:col-span-4 flex gap-4 justify-start md:justify-end">
            <a href="https://github.com/mrtrq" aria-label="GitHub">GitHub</a>
            <a href="mailto:tarreq.maulana@gmail.com" aria-label="Email">Email</a>
        </div>
    </div>
</footer>
);
}
