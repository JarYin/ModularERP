import '../globals.css';
import ClientBoundary from '../../components/layout/ClientBoundary';

export const metadata = {
    title: 'Dashboard | ModularERP',
    description: 'Manage your business efficiently with ModularERP dashboard.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClientBoundary>{children}</ClientBoundary>
    );
}
