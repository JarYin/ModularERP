// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async signUp(email: string, password: string, firstName: string,
    lastName: string,) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase error:", error);
      throw new BadRequestException(error.message);
    }

    const user = data.user;

    if (!user) {
      throw new BadRequestException("User creation failed");
    }

    const { error: profileError } = await supabase
      .from("user_account")
      .insert([
        {
          user_id: user.id,
          org_id: null,
          email,
          first_name: firstName ?? null,
          last_name: lastName ?? null,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    if (profileError) {
      console.error("Insert profile error:", profileError);
      throw new BadRequestException(profileError.message);
    }

    return {
      message: "User created successfully",
      user,
    };
  }

  async signIn(email: string, password: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      user: data.user,
    };
  }

  async forgotPassword(email: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin/resetPassword`,
    });

    if (error) throw error;
    return { message: "Reset password email sent", data: data };
  }

  async resetPassword(newPassword: string) {
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error;
    return { message: "Password updated successfully" };
  }

}