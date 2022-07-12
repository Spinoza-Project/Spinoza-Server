export interface TourResponseDto {
    tours: Tour[];
}

interface Tour {
    tourName: string;
    tourImage: string;
}
