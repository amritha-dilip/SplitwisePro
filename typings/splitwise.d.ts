interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    picture: {
        small: string;
        medium: string;
        large: string;
    },
    email: string;
    registration_status: string;
    force_refresh_at: string,
    locale: string,
    country_code: string;
    date_format: string;
    default_currency: string;
    default_group_id: number;
    notifications_read: string;
    notifications_count: number;
    notifications: {
        added_as_friend: boolean;
        added_to_group: boolean;
        expense_added: boolean;
        expense_updated: boolean;
        bills: boolean;
        payments: boolean;
        monthly_summary: boolean;
        announcements: boolean;
    }
}