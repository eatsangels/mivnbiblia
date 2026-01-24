import { redirect } from 'next/navigation';

export default async function ReadRootPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const sp = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
            if (Array.isArray(value)) {
                value.forEach(v => sp.append(key, v));
            } else {
                sp.append(key, value);
            }
        }
    });

    const queryString = sp.toString();
    const destination = queryString ? `/read/Génesis/1?${queryString}` : '/read/Génesis/1';

    redirect(destination);
}
