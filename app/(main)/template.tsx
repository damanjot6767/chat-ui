import Sidebar from "../components/sidebar/sidebar";

export default function Template({ children }: { children: React.ReactNode }) {
    return <div className='h-full'>
        <Sidebar />
        {children}
    </div>
}