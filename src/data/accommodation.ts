export interface Accommodation {
  id: string;
  slug: string;
  translationIndex: number;
  photo: string;
  confirmed: boolean;
  capacity: number | null;
  size: number | null;
  beds: string | null;
  amenities: number[];
}
export const accommodations: Accommodation[] = [
  {
    id: "type-1",
    slug: "maisonette",
    translationIndex: 0,
    photo: "/images/curated/maisonette-overview.jpg",
    confirmed: true,
    capacity: null,
    size: null,
    beds: null,
    amenities: [],
  },
];
