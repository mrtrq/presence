export function Footer() {
return (
<footer className="border-t border-[--color-fg]">
    <div className="container-swiss py-10 grid-12 items-end">
        <div className="col-span-12 md:col-span-8">
            <p className="medium">© {new Date().getFullYear()} Muhammad Tarreq</p>
            </div>
        <div className="col-span-12 md:col-span-4 flex gap-4 justify-start md:justify-end">
            <a href="https://x.com/plandemic_" aria-label="X">X</a>
            <a href="https://github.com/mrtrq" aria-label="GitHub">GitHub</a>
            <a href="mailto:tarreq.maulana@gmail.com" aria-label="Email">Email</a>
        </div>
    </div>
</footer>
);
}