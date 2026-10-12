import Link from "next/link";
export default function NotFound() {
    return <main>
    <h1>Documento não encontrado / Document not found</h1>
    <p>O endereço não corresponde a um documento desta demonstração.</p>
    <Link className="clear" href="/pt">Biblioteca / Library</Link>
    </main>;
}
