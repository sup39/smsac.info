import Link from 'next/link';

export default function NavHeader({onToggleFold}: {onToggleFold?: ()=>void}) {
  return <header>
    <Link href="/" id="icon-link">
      <img className='icon' src='/favicon.svg' alt='icon' width={96} height={96} />
      <div className="icon-text">
        <div>SMS</div>
        <div>研究Info</div>
      </div>
    </Link>
    <div className="menu-toggle" onClick={onToggleFold} />
  </header>;
}
