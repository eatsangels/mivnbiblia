import { AlbumManager } from "@/components/admin/AlbumManager";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function AdminAlbumPage({ params }: PageProps) {
    const { id } = await params;
    return <AlbumManager albumId={id} />;
}
