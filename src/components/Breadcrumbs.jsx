import { Link } from 'react-router'

/** Visible breadcrumb trail. The last item is the current page. */
export default function Breadcrumbs({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/60">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-white">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="hover:text-mower underline-offset-4 transition-colors hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
