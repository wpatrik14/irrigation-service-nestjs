export interface Temperature {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface RealFeelTemperature {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface WetBulbTemperature {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface DewPoint {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Speed {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Direction {
    Degrees: number;
    Localized: string;
    English: string;
}

export interface Wind {
    Speed: Speed;
    Direction: Direction;
}

export interface WindGust {
    Speed: Speed;
}

export interface Visibility {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Ceiling {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface TotalLiquid {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Rain {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Snow {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Ice {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface WeatherData {
    DateTime: Date;
    EpochDateTime: number;
    WeatherIcon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    IsDaylight: boolean;
    Temperature: Temperature;
    RealFeelTemperature: RealFeelTemperature;
    WetBulbTemperature: WetBulbTemperature;
    DewPoint: DewPoint;
    Wind: Wind;
    WindGust: WindGust;
    RelativeHumidity: number;
    Visibility: Visibility;
    Ceiling: Ceiling;
    UVIndex: number;
    UVIndexText: string;
    PrecipitationProbability: number;
    RainProbability: number;
    SnowProbability: number;
    IceProbability: number;
    TotalLiquid: TotalLiquid;
    Rain: Rain;
    Snow: Snow;
    Ice: Ice;
    CloudCover: number;
    MobileLink: string;
    Link: string;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}


export interface Region {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

export interface Country {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

export interface AdministrativeArea {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
}

export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: Date;
}

export interface Metric {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Imperial {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Elevation {
    Metric: Metric;
    Imperial: Imperial;
}

export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: Elevation;
}

export interface LocationData {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Region;
    Country: Country;
    AdministrativeArea: AdministrativeArea;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    SupplementalAdminAreas: any[];
    DataSets: string[];
}


