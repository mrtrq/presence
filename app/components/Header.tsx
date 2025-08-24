export function Header() {
const links = [
{ href: "#home", label: "Home" },
{ href: "#about", label: "About" },
{ href: "#work", label: "Work" },
{ href: "#writing", label: "Writing" },
{ href: "#contact", label: "Contact" },
];
return (
    <header className="header">
        <div className="container-swiss flex items-center justify-between py-4">
        <a href="#home" className="no-underline font-bold tracking-tight text-xl">Tarreq Maulana</a>
        <nav className="nav flex gap-6">
            {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
            ))}
        </nav>
        </div>
    </header>
);
}