import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getProfile(req) {
        const userId = req.user.id;
        const { data, error } = await this.supabaseService
            .getClient()
            .from('user_organization')
            .select('user_id, org_id')
            .eq('user_id', userId)
            .maybeSingle();

        if (error) throw new Error(error.message);

        if (data === null) {
            const { data, error } = await this.supabaseService
                .getClient()
                .from('user_account')
                .select('user_id')
                .eq('user_id', userId)
                .maybeSingle();
            if (error) throw new Error(error.message);
            return data;
        }

        return data;
    }
}
