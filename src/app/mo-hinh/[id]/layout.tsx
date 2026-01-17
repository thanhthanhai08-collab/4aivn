import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function OldModelLayout({ params }: Props) {
  redirect(`/bang-xep-hang/${params.id}`);
}
