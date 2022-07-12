export interface FarmFarmerResponseDto {
    farms: Data[];
}

interface Data {
    farmName: string;
    farmAddress: string;
    farmImage: string;
    weather: string;
    temperature: string;
    humidity: string;
    notifications: number;
}
