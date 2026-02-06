'use client'

import dynamic from 'next/dynamic'

// Dynamic imports with ssr: false - only works in Client Components
// These modals/drawers need client-side only rendering because they:
// 1. Use browser APIs (localStorage, window)
// 2. Have animations that should only run client-side
// 3. Don't need SEO indexing
const NewsletterPopup = dynamic(
  () => import('@/components/NewsletterPopup'),
  { ssr: false }
)

const CartDrawer = dynamic(
  () => import('@/components/CartDrawer'),
  { ssr: false }
)

const QuickViewModal = dynamic(
  () => import('@/components/QuickViewModal'),
  { ssr: false }
)

/**
 * ClientProviders wraps children and renders client-only components.
 * This component exists because `ssr: false` in dynamic() can only be used
 * in Client Components, not in Server Components like layout.tsx.
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <NewsletterPopup />
      <CartDrawer />
      <QuickViewModal />
    </>
  )
}
