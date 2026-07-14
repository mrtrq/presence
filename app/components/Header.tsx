export function Header() {
const links = [
{ href: "#home", label: "Home" },
{ href: "#about", label: "About" },
{ href: "#projects", label: "Projects" },
{ href: "#writing", label: "Writings" },
{ href: "#contact", label: "Contact" },
];
return (
    <header className="header">
        <div className="container-swiss flex items-center justify-between py-4">
        <a href="#home" className="nav-brand">Tarreq Maulana</a>
        <nav className="nav flex gap-6">
            {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
        </nav>
        </div>
    </header>
);
}
