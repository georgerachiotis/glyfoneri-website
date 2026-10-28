export interface Photo {
  id: string;
  src: string;
  category: number;
  alt: { el: string; en: string };
  width: number;
  height: number;
}

const photo = (
  id: string,
  file: string,
  category: number,
  el: string,
  en: string,
): Photo => ({
  id,
  src: `/images/curated/${file}`,
  category,
  alt: { el, en },
  width: 1024,
  height: 768,
});

export const photos: Photo[] = [
  photo(
    "seafront",
    "beachfront.jpg",
    2,
    "Ξαπλώστρες και ψάθινες ομπρέλες δίπλα στη θάλασσα",
    "Sun loungers and straw parasols beside the sea",
  ),
  photo(
    "maisonette",
    "maisonette-overview.jpg",
    1,
    "Εσωτερικό μεζονέτας με ξύλινη σκάλα και μικρή κουζίνα",
    "Maisonette interior with a timber staircase and kitchenette",
  ),
  photo(
    "living-area",
    "living-area.jpg",
    1,
    "Καθιστικό και τραπεζαρία με ξύλινη σκάλα προς το υπνοδωμάτιο με δύο μονά κρεβάτια",
    "Living and dining area with timber stairs leading to the bedroom with two single beds",
  ),
  photo(
    "twin-room",
    "twin-bedroom.jpg",
    1,
    "Υπνοδωμάτιο με δύο μονά κρεβάτια",
    "Bedroom with two single beds",
  ),
  photo(
    "bathroom",
    "bathroom.jpg",
    1,
    "Μπάνιο με ντους",
    "Bathroom with a shower",
  ),
  photo(
    "beach-loungers",
    "beach-loungers.jpg",
    2,
    "Ξαπλώστρες και ψάθινες ομπρέλες δίπλα στη θάλασσα",
    "Sun loungers and straw parasols beside the sea",
  ),
  photo(
    "garden",
    "garden.jpg",
    3,
    "Καθιστικό σε σκιερό σημείο του κήπου",
    "Shaded seating in the garden",
  ),
  photo(
    "garden-path",
    "garden-path.jpg",
    3,
    "Καθιστικό στον κήπο, ανάμεσα σε φυτά και δέντρα",
    "Garden seating among plants and trees",
  ),
  photo(
    "terrace",
    "terrace-seating.jpg",
    3,
    "Σκεπαστή βεράντα με τραπέζι και καθίσματα",
    "Shaded terrace with a table and chairs",
  ),
  photo(
    "sea-view-balcony",
    "sea-view-balcony.jpg",
    4,
    "Θέα στη θάλασσα από το μπαλκόνι",
    "Sea view from the balcony",
  ),
  photo(
    "sea-view-plants",
    "sea-view-plants.jpg",
    4,
    "Θέα στη θάλασσα μέσα από ανθισμένα φυτά",
    "Sea view framed by flowering plants",
  ),
  photo(
    "sea-view-arch",
    "sea-view-arch.jpg",
    4,
    "Θέα στη θάλασσα μέσα από καμάρα",
    "Sea view through an arch",
  ),
];
