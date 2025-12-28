"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  useMeQuery,
  useUpdateProfileMutation,
  useUpdateUsernameMutation,
} from "@/lib/graphql/generated";
import { useAuthStore } from "@/store/auth";

const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    )
    .optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  birthdate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("profile");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateUsername] = useUpdateUsernameMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      bio: "",
      birthdate: "",
    },
  });

  const hasUsername = !!data?.me?.username;

  useEffect(() => {
    if (data?.me) {
      const profile = data.me.profile;
      form.reset({
        username: data.me.username || "",
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        phoneNumber: profile?.phoneNumber || "",
        bio: profile?.bio || "",
        birthdate: profile?.birthdate
          ? new Date(profile.birthdate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [data, form]);

  const getLocalePath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const onSubmit = async (formData: ProfileFormValues) => {
    setIsLoading(true);
    try {
      // Update username if provided and not already set
      if (formData.username && !hasUsername) {
        const result = await updateUsername({
          variables: {
            username: formData.username,
          },
        });

        // Update auth store with new username
        if (result.data?.updateUsername && data?.me) {
          const { setAuth } = useAuthStore.getState();
          setAuth(
            { ...data.me, username: result.data.updateUsername.username },
            localStorage.getItem("token") || ""
          );
        }
      }

      // Update profile
      await updateProfile({
        variables: {
          updateProfileInput: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber || undefined,
            bio: formData.bio || undefined,
            birthdate: formData.birthdate || undefined,
          },
        },
      });

      toast({
        title: t("success"),
        description: t("success"),
      });

      router.push(getLocalePath("/profile"));
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message || t("error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("edit")}</CardTitle>
            <CardDescription>{t("personalInfo")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("username")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading || hasUsername}
                          placeholder="johndoe"
                        />
                      </FormControl>
                      {hasUsername ? (
                        <p className="text-xs text-muted-foreground">
                          {locale === "es"
                            ? "El nombre de usuario no se puede cambiar una vez establecido"
                            : "Username cannot be changed once set"}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {locale === "es"
                            ? "Elige sabiamente, no podrás cambiarlo después"
                            : "Choose wisely, you won't be able to change it later"}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("firstName")}</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("lastName")}</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+591 12345678"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("birthdate")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("bio")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            locale === "es"
                              ? "Cuéntanos sobre ti..."
                              : "Tell us about yourself..."
                          }
                          className="resize-none"
                          rows={4}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("save")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(getLocalePath("/profile"))}
                    disabled={isLoading}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
