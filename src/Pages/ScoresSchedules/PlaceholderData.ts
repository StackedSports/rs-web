export interface IData {
    high_school_ID: string;
    name: string;
    mascot: string;
    address: string;
    country?: any;
    city: string;
    state: string;
    postal_code: string;
    office_phone: string;
    time_zone: string;
    time_zone_offset: string;
    division: string;
    league: string;
    color1: string;
    color2: string;
    head_coach_name: string;
    max_prep_team_ID: string;
    max_prep_schedule_url: string;
    max_prep_logo_url: string;
    ets_code: string;
    points: string;
    points_against: string;
    overall_wins: string;
    overall_losses: string;
    overall_ties: string;
    conference_wins: string;
    conference_losses: string;
    conference_ties: string;
    home_wins: string;
    home_losses: string;
    home_ties: string;
    away_wins: string;
    away_losses: string;
    away_ties: string;
    neutral_wins: string;
    neutral_losses: string;
    neutral_ties: string;
    winning_percentage: string;
    conference_winning_percentage: string;
    streak: string;
    streak_result: string;
    last_updated: string;
}

export interface ISearch {
    status: number;
    startRow: number;
    endRow: number;
    totalRows: number;
    data: IData[];
}

export const search: ISearch = {
    "status": 0,
    "startRow": 0,
    "endRow": 1,
    "totalRows": 1,
    "data": [{
        "high_school_ID": "102",
        "name": "Copper Hills",
        "mascot": "Grizzlies",
        "address": "5445 W New Bingham Hwy",
        "country": null,
        "city": "West Jordan",
        "state": "UT",
        "postal_code": "84088",
        "office_phone": "(801) 256-5300",
        "time_zone": "Mountain Standard Time",
        "time_zone_offset": "-7",
        "division": "Division 6A",
        "league": "6A Region 3",
        "color1": "022C66",
        "color2": "00341E",
        "head_coach_name": "Corey Dodds",
        "max_prep_team_ID": "2f533e77-09c2-4363-8b72-3132147dac55",
        "max_prep_schedule_url": "https://www.maxpreps.com/ut/west-jordan/copper-hills-grizzlies/ football/schedule/",
        "max_prep_logo_url": "https://images.maxpreps.com/schoolmascot/2/f/5/2f533e77-09c2-4363-8b72-3132147dac55.gif?version=636861616200000000&width=1024&height=1024",
        "ets_code": "450450",
        "points": "35",
        "points_against": "42",
        "overall_wins": "0",
        "overall_losses": "1",
        "overall_ties": "0",
        "conference_wins": "0",
        "conference_losses": "0",
        "conference_ties": "0",
        "home_wins": "0",
        "home_losses": "1",
        "home_ties": "0",
        "away_wins": "0",
        "away_losses": "0",
        "away_ties": "0",
        "neutral_wins": "0",
        "neutral_losses": "0",
        "neutral_ties": "0",
        "winning_percentage": "0",
        "conference_winning_percentage": "0",
        "streak": "1",
        "streak_result": "L",
        "last_updated": "2022-08-13 12:02:35"
    }]
}

export const searchEvent = {
    "status": 0,
    "startRow": 0,
    "endRow": 10,
    "totalRows": 10,
    "data": [{
        "high_school_event_ID": "158994",
        "max_prep_contest_ID": "5523ec04-6552-4140-8a99- 6adcdd0171e2",
        "name": "Cedar Valley at Copper Hills",
        "location": null,
        "event_time": "2022-08-12 19:00:00",
        "home_team_name": "Copper Hills",
        "away_team_name": "Cedar Valley",
        "team1_high_school_ID": "102",
        "team1_score": "35",
        "team1_result": "L",
        "team1_has_stats": null,
        "team2_high_school_ID": "51",
        "team2_score": "42",
        "team2_result": "W",
        "team2_has_stats": null,
        "home_team_school_ID": "102",
        "game_type": "non-conference",
        "overtime_periods": "0",
        "max_prep_contest_url": "https://www.maxpreps.com/games/8-12-2022/football-22/cedar-valley-vscopper-hills.htm?c=BOwjVVJlQEGKmWrc3QFx4g",
        "year": "2022",
        "last_updated": "2022-08-13 12:06:58",
        "team1_name": "Copper Hills",
        "team1_logo_url": "https://images.maxpreps.com/schoolmascot/2/f/5/2f533e77-09c2-4363-8b72-3132147dac55.gif?version=636861616200000000&width=1024&height=1024",
        "team1_color1": "022C66",
        "team1_color2": "00341E",
        "team2_name": "Cedar Valley",
        "team2_logo_url": "https://images.maxpreps.com/schoolmascot/e/b/5/eb53555a-f7d5-456f-8f7b-b6b7eed38f90.gif?version=637650478200000000&width=1024&height=1024",
        "team2_color1": "52000E",
        "team2_color2": "454444"
    }, {
        "high_school_event_ID": "159054",
        "max_prep_contest_ID": "eac58eff-e62e-46a7-8a4e 5b1dcbb7cffc",
        "name": "Copper Hills at Murray",
        "location": null,
        "event_time": "2022-08-19 19:00:00",
        "home_team_name": "Murray",
        "away_team_name": "Copper Hills",
        "team1_high_school_ID": "102",
        "team1_score": null,
        "team1_result": null,
        "team1_has_stats": null,
        "team2_high_school_ID": "54",
        "team2_score": null,
        "team2_result": null,
        "team2_has_stats": null,
        "home_team_school_ID": "54",
        "game_type": "non-conference",
        "overtime_periods": "0",
        "max_prep_contest_url":
            "https://www.maxpreps.com/games/8-19-2022/football-22/copper-hills-vs murray.htm?c=_47F6i7mp0aKTlsdy7fP_A",
        "year": "2022",
        "last_updated": "2022-08-13 12:06:58",
        "team1_name": "Copper Hills",
        "team1_logo_url": "https://images.maxpreps.com/school mascot/2/f/5/2f533e77-09c2-4363-8b72-3132147dac55.gif? version=636861616200000000&width=1024&height=1024",
        "team1_color1": "022C66",
        "team1_color2": "00341E",
        "team2_name": "Murray",
        "team2_logo_url": "https://images.maxpreps.com/school mascot/c/f/0/cf0f9ae9-afa2-48f7-8fdd-dba8e341eb64.gif? version=636445150800000000&width=1024&height=1024",
        "team2_color1": "CC4E10",
        "team2_color2": "222222"
    },
    ]
}