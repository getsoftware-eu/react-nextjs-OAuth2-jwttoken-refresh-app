/**
 * If you were to combine the two layouts above, the root layout (app/layout.js) would 
 * wrap the dashboard layout (app/dashboard/layout.js), 
 * which would wrap <route segments!> inside app/dashboard/*.
 * @param children
 * @constructor
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}