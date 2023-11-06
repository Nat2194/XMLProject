export declare class CreateMovieDto {
    readonly title: string;
    readonly duration: number;
    readonly language: string;
    readonly subtitles?: string;
    readonly director: string;
    readonly mainActors: string;
    readonly minAgeRequired: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly daysPerWeek: number;
    readonly startingTime: string;
}
